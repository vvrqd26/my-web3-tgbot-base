import { CallbackQuery, Message,SendMessageOptions,EditMessageTextOptions } from "npm:@types/node-telegram-bot-api";

export type MessageHandler = (message: Message) => React.JSX.Element|[React.JSX.Element,SendMessageOptions|EditMessageTextOptions]
export type CallbackHandler = (callbackQuery: CallbackQuery) => React.JSX.Element|[React.JSX.Element,SendMessageOptions|EditMessageTextOptions]