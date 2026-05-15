import crypto from 'crypto'
import { logger } from './log.js'
export function generateBase64String(length = 32) {
  return crypto.randomBytes(Math.ceil(length * 3 / 4))
    .toString('base64')
    .slice(0, length)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export function secret_verification(request, response, next) {
  try {
    const sign = request.headers["x-hub-signature-256"] ?? "";
    const APP_SECRET = process.env.APP_SECRET;
    const hmac = crypto.createHmac('sha256', APP_SECRET);
    const hash = "sha256=" + hmac.update(request.request_buffer).digest("hex");
    console.log(`Recive Verif :\nsign:${sign}\nvrif:${hash}\n`)
    const verify = crypto.timingSafeEqual(
      Buffer.from(sign),
      Buffer.from(hash)
    )
    if (verify) { return next() }
    return response.status(401).send("Unauthorized");
  } catch (error) {
    logger.error(error.toString());
    return response.status(401).send("Unauthorized");
  }
}
