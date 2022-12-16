import { bot } from "./mod.ts";

await bot.start({
  onStart: () => {
    console.log(`Listening as @${bot.botInfo.username}`);
  },
});
