import { createLogger, transports, format } from "winston";
import path from "path";

import winston from "winston/lib/winston/config";
import serverConfig from "../config/server-config";

const logDir = path.resolve(__dirname, "../../logs");
const isDev: boolean = serverConfig.BUN_ENV !== "production";

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const logger = createLogger({
  level: isDev ? "debug" : "info",
  format: format.combine(
    format.timestamp(),
    format.colorize({ all: true }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: isDev
        ? format.combine(format.colorize(), format.simple())
        : format.json(),
    }),
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    new transports.File({ filename: path.join(logDir, "combined.log") }),
  ],
});

export default logger;
