import { CallbackHandler, MessageHandler } from "./messageHandler.ts";
import { bot } from "./bot.ts";
import { render } from "./render.ts";

export type updateParams = 'self'|{messageID:number,chatID:number}

export const startWith = (path: string) => {
    return new RegExp(`^${path}`)
}
export const equal = (path: string) => {
    return new RegExp(`^${path}$`)
}

/**
 * 绑定command
 * @param path 
 * @param handler 
 * @param update 
 */
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
                    ...opts?.reply_markup
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
                    ...opts?.reply_markup
                },
                parse_mode: 'HTML',
            });
        }
    });
}
/**
 * 绑定callback
 * @param data 
 * @param handler 
 * @param update 
 */
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
                    ...opts?.reply_markup,
                },
            });
        }
    })
}
/**
 * 同时绑定command和callback
 * @param to 
 * @param handler 
 * @param update 
 */
export const commandAndCallback = (to:RegExp,handler:ICommandAndCallbackHandler, update?:updateParams) => {
    command(to, handler.command, update)
    callback(to, handler.callback, update)
}

/**
 * 解析参数字符串
 * @param commandStr 
 * @returns 
 */
export function parseCommand(commandStr:string) {
    const arr = commandStr.split(':');
    const [command, ...args] = arr;
    return {
        command,
        args,
    }
}

export interface ICommandAndCallbackHandler {
    command: MessageHandler,
    callback: CallbackHandler    
}