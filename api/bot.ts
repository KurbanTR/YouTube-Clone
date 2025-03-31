import { NowRequest, NowResponse } from "@vercel/node";
import { Telegraf } from "telegraf";

const bot = new Telegraf('8020324555:AAFDbJGTwZrJwsLZnSA5GD4OdmGteBWRpZE');

bot.command("web", (ctx) => {
  ctx.reply("Открыть веб-приложение", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Открыть", web_app: { url: "https://t.me/MyYouTubeCloneBot/YouTubeClone" } }],
      ],
    },
  });
});

export default async function handler(req: NowRequest, res: NowResponse) {
  if (req.method === "POST") {
    await bot.handleUpdate(req.body);
  }
  res.status(200).send("OK");
}
