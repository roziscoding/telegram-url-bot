import { Api } from "grammy";
import { config } from "./config.ts";

const url = Deno.args[0];

if (!url) {
  console.info("Usage: set-webhook.ts <webhook-url>");
  Deno.exit(1);
}

const api = new Api(config.telegram.token);

console.log(`Setting webhook to ${url}`);

console.log(
  await api.setWebhook(url, { secret_token: config.telegram.secret }),
);
