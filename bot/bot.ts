
// @deno-types=npm:@types/node-telegram-bot-api
import Bot from "npm:node-telegram-bot-api";
const WEB_HOOK = Deno.env.get('WEB_HOOK') 
const BOT_TOKEN = Deno.env.get('BOT_TOKEN')
if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN not found')
}
export const bot = Deno.env.get('WEB_HOOK') ? new Bot(BOT_TOKEN,{
  webHook: {
    host: WEB_HOOK,
    port: Number(Deno.env.get('WEB_HOOK_PORT') ?? 443)
  },
}): new Bot(BOT_TOKEN, { polling: true });
if (WEB_HOOK) {
  console.log('web hook start',WEB_HOOK)
}
