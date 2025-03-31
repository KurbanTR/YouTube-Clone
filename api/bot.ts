import express from 'express';
import { Telegraf } from 'telegraf';

const app = express();
const bot = new Telegraf('8020324555:AAFDbJGTwZrJwsLZnSA5GD4OdmGteBWRpZE');

bot.start((ctx) => {
  ctx.reply('Привет! Нажми кнопку для открытия веб-приложения', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть веб-приложение',
            web_app: { url: 'https://you-tube-clone-delta-puce.vercel.app' }
          }
        ]
      ]
    }
  });
});

// Обрабатываем запросы от Telegram
app.use('/api/bot', express.json(), async (req, res) => {
  await bot.handleUpdate(req.body);
  res.sendStatus(200); // Ответ Telegram о том, что данные получены
});

app.listen(5173, () => {
  console.log('Server is running on port 5173');
});
