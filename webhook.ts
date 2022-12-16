import { serve } from "https://deno.land/std@0.168.0/http/mod.ts";
import { bot } from "./mod.ts";
import { webhookCallback } from "grammy";
import { config } from "./config.ts";

const handleUpdate = webhookCallback(bot, "std/http", {
  secretToken: config.telegram.secret,
});

serve(handleUpdate);
