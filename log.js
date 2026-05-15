import winston from 'winston'

const { combine, timestamp, json, colorize, simple } = winston.format;

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs.json' }),
    new winston.transports.Console({
      format: combine(
        colorize(),
        simple()
      )
    })
  ]
})
