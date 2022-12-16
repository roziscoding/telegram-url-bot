import "https://deno.land/std@0.168.0/dotenv/load.ts";

export const config = {
  telegram: {
    token: Deno.env.get("TELEGRAM_TOKEN") ?? "",
    secret: Deno.env.get("TELEGRAM_TOKEN")?.replace(/[^a-z0-9]/ig, ""),
  },
};
