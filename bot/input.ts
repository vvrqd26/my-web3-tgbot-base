import { bot } from "./bot.ts";

export const getInput = async (chatID:number,title:string):Promise<string> => {
    let res = ''
    let amsgID = 0
    const qmsg = await bot.sendMessage(chatID,title, {
        reply_markup: {
            force_reply: true
        }
    })


    return new Promise (resolve=> {
        const handler = bot.onReplyToMessage(chatID,qmsg.message_id, async (msg) => {
            res = msg.text ?? ''
            amsgID = msg.message_id
    
            bot.removeReplyListener(handler)
            resolve(res)
            bot.deleteMessage(chatID,qmsg.message_id)
            bot.deleteMessage(chatID,amsgID)
        })
    })
}