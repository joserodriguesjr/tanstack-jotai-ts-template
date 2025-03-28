// check for more info: https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications
import winston from 'winston';

const { combine, timestamp, printf, colorize, align } = winston.format;

// const errorFilter = winston.format((info, opts) => {
//   return info.level === 'error' ? info : false;
// });

// const infoFilter = winston.format((info, opts) => {
//   return info.level === 'info' ? info : false;
// });

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({
    //   filename: 'app-error.log',
    //   level: 'error',
    //   format: combine(errorFilter(), timestamp(), json()),
    // }),
    // new winston.transports.File({
    //   filename: 'app-info.log',
    //   level: 'info',
    //   format: combine(infoFilter(), timestamp(), json()),
    // }),
  ],
});
