import { ReactNode } from "npm:@types/react";
import { KeyboardButton,Message,SendMessageOptions,EditMessageTextOptions,EditMessageReplyMarkupOptions,CallbackQuery } from "npm:@types/node-telegram-bot-api";

export type MessageOptions = SendMessageOptions|EditMessageTextOptions|EditMessageReplyMarkupOptions;
export type HandlerReturn<o extends MessageOptions> = {
    node: ReactNode,
    btns?: KeyboardButton[][],
    opts?: o
}
export type MessageHandler<o extends MessageOptions = SendMessageOptions> = (msg:Message) => Promise<HandlerReturn<o>>
export type CallbackHandler<o extends MessageOptions = SendMessageOptions> = (msg:CallbackQuery) => Promise<HandlerReturn<o>>