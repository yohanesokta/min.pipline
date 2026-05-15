import express from "express"
import cors from "cors"
import { generateBase64String, secret_verification } from "./crypto.js"
import { push_event } from "./runner.js"
const app = express();
const APP_PORT = 9013;
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

  switch (XGEvent) {
    case "push":
      push_event();
      response.status(200).send(`running : ${XGEvent}`);
      break;
    default:
      return response.status(404).send("Event Not Found");
  }
  console.log("Github Event :" + XGEvent);
});

app.use((_, response) => {
  response.status(404).send("Not Found Endpoints");
})

app.listen(APP_PORT, () => {
  console.log(`min.pipline Is Running ON \nURL : http://localhost:${APP_PORT}\nSECRET : ${process.env.APP_SECRET}`);
})
