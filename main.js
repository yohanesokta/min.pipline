#!/usr/bin/env node

import express from "express"
import cors from "cors"
import { generateBase64String, secret_verification } from "./crypto.js"
import { push_event } from "./runner.js"
import { logger } from "./log.js"
import { tunnelmole } from "tunnelmole";

const app = express();
const APP_PORT = process.env.APP_PORT ?? 9013;
if (!process.env.APP_SECRET) {
  process.env.APP_SECRET = generateBase64String(32);
}

app.use(cors(
  { origin: "*" }
))

app.use(express.json({
  verify: (_, __, buffer) => {
    _.request_buffer = buffer;
  }
}))

app.post("/webhook", secret_verification, (request, response) => {
  const XGEvent = request.headers['x-github-event'] ?? "";
  logger.info(`Received GitHub Event: ${XGEvent}`);
  switch (XGEvent) {
    case "ping":
      return response.send("OK TESTED!")
    case "push":
      push_event("push.sh", request.body);
      response.status(200).send(`Handling push event via push.sh`);
      break;
    default:
      push_event(`${XGEvent}.sh`, request.body);
      response.status(200).send(`Handling ${XGEvent} event via ${XGEvent}.sh`);
  }
});

app.use((_, response) => {
  response.status(404).send("Not Found Endpoints, But min-pipeline is running!");
})

const args = process.argv.slice(2);
const tunnelArg = args.find(arg => arg.startsWith("tunnel="));
const tunnel = tunnelArg
  ? tunnelArg.split("=")[1] === "true"
  : false;

if (tunnel) {
  const domain = process.env.CUSTOM_DOMAIN ?? null
  let options = { port: APP_PORT }
  if (domain) {
    options['domain'] = domain;
  }
  tunnelmole(options, false).then((elements) => {
    logger.info(`Tunnel active: ${elements.toString()}/webhook`);
    logger.info(`secret : ${process.env.APP_SECRET}`);
  }).catch((error) => {
    logger.error(`Tunnel error: ${error.toString()}`);
  });
}

app.listen(APP_PORT, () => {
  logger.info(`'min-pipeline' Is Running ON URL: http://localhost:${APP_PORT}`);
  if (!tunnel) {
    logger.info(`secret : ${process.env.APP_SECRET}`);
  }
})
