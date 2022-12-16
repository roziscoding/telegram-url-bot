import { Bot } from "grammy";
import { config } from "./config.ts";

export const bot = new Bot(config.telegram.token);

const getUrl = (query: string) => {
  try {
    return new URL(query);
  } catch {
    return null;
  }
};

const urlOrEmpty = (text?: string) => text && getUrl(text) ? text : "";

bot.inlineQuery(/^https?:\/\/.*/, (ctx) => {
  const query = ctx.inlineQuery.query;

  console.log(query);

  const url = getUrl(query);

  if (!url) return ctx.answerInlineQuery([]);

  const cleanUrl = `${url.origin}${url.pathname}`;

  return ctx.answerInlineQuery([
    {
      id: query,
      type: "article",
      title: "Send as clean URL",
      url: cleanUrl,
      input_message_content: {
        message_text: cleanUrl,
      },
    },
  ]);
});

bot.inlineQuery(/.*/, (ctx) => ctx.answerInlineQuery([]));

bot.on(
  "message",
  (ctx) =>
    ctx.reply("I only work inline!", {
      reply_markup: {
        inline_keyboard: [[{
          text: "Go inline",
          switch_inline_query: urlOrEmpty(ctx.message.text),
        }]],
      },
    }),
);

bot.catch((err) => {
  console.log(JSON.stringify(err));
});
