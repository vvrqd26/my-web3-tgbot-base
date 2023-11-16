import { CallbackHandler, MessageHandler } from "./messageHandler.ts";
import { bot } from "./bot.ts";
import { render } from "./render.ts";

export type updateParams = 'self'|{messageID:number,chatID:number}

export function command (   
    path: RegExp,
    handler: MessageHandler,
    update?: updateParams
){
    bot.onText(path,async msg=>{
        const {node,btns,opts} = await handler(msg);
        if (update) {
            bot.editMessageText(render(node),{
                ...opts,
                reply_markup: {
                    inline_keyboard: btns ?? [],
                },
                ...(update === 'self' ? {
                    message_id: msg.message_id,
                    chat_id: msg.chat.id,
                }:{
                    message_id: update.messageID,
                    chat_id: update.chatID,
                }),
                parse_mode: 'HTML'
            });
        } else {
            bot.sendMessage(msg.chat.id, render(node),{
                ...opts,
                reply_markup: {
                    inline_keyboard: btns ?? [],
                },
                parse_mode: 'HTML'
            });
        }
    });
}
export function callback (
    data: RegExp,
    handler: CallbackHandler,
    update?: updateParams
){
    bot.on('callback_query', async msg=>{
        if (!msg.data || !data.test(msg.data)) return;
        const {node,btns,opts} = await handler(msg);
        if (update) {
            bot.editMessageText(render(node),{
                ...opts,
                reply_markup: {
                    inline_keyboard: btns ?? [],
                },
                ...(update === 'self' ? {
                    message_id: msg.message?.message_id,
                    chat_id: msg.from.id,
                }:{
                    message_id: update.messageID,
                    chat_id: update.chatID,
                }),
                parse_mode: 'HTML'
            });
        } else {
            bot.sendMessage(msg.from.id, render(node),{
                ...opts,
                reply_markup: {
                    inline_keyboard: btns ?? [],
                }
            });
        }
    })
}