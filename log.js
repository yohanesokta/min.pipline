import winston from 'winston'

const { combine, json, colorize, simple } = winston.format;

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
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
