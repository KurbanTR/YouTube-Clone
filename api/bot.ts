import { Telegraf } from 'telegraf';
import { VercelRequest, VercelResponse } from '@vercel/node';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'POST') {
      await bot.handleUpdate(req.body);
      res.status(200).send('OK');
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).send('Internal Server Error');
  }
}
