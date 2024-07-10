import "dotenv/config";
import { Telegraf } from "telegraf";
import chalk from "chalk";

const bot = new Telegraf(process.env.BOT_TOKEN || "");
/**
 * nothing sus
 * @param {"info" | "warn" | "success" } level
 * @param {...any} content
 * @returns
 */
const logger = (level, ...content) => {
  const time = new Date().toLocaleTimeString("id-ID", {
    timeZone: "Asia/Jakarta",
  });

  const color = {
    info: "blueBright",
    warn: "redBright",
    success: "greenBright",
  }[level];

  return console.log(
    chalk.gray(time),
    chalk[color](`[ ${level.toUpperCase()} ]`),
    content
      .map((arg) =>
        typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
      )
      .join(" ")
      .trim()
  );
};

export { bot, logger };
