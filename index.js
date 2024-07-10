import { bot, logger } from "./lib/system.js";
import { MisMisi } from "./lib/components.js";
import chalk from "chalk";

bot.start(async (ctx) => {
  await ctx.reply("Hello its me MisMisi, SimSimi but reversed.");
});

bot.help(async (ctx) => {
  await ctx.reply("This bot will automatically reply your message.");
});

bot.on("message", async (ctx) => {
  const message = (ctx.update || ctx).message;
  if (!message.text) return;

  try {
    logger(
      "info",
      `${chalk.bold(
        message.from.first_name + (message.from.last_name || "")
      )} (${chalk.blueBright(message.chat.type)})${
        message.text && ": " + message.text
      }`
    );
    const response = await MisMisi(message.text);
    if (response.message) {
      return await ctx.reply(response.message, {
        reply_parameters: { message_id: message.message_id },
      });
    }
  } catch (error) {
    logger("warn", error);
    return await ctx.reply("error!", {
      reply_parameters: { message_id: message.message_id },
    });
  }
});

bot.launch(async () => {
  const me = await bot.telegram.getMe();
  logger("info", "Starting...");
  logger("info", "Script by @NurFy, please don't sell this script");
  logger("success", "logged", me);
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
