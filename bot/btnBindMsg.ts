import { CallbackQuery, EditMessageTextOptions, SendMessageOptions } from "npm:@types/node-telegram-bot-api";
import { DataBindMsg } from "./dataBindMsg.ts";

export interface IBtn {
  name: string,
  id: string,
  params: Array<string>
}
export type BtnHandler = (params:Array<string>)=>void
export class BtnBindMsg<T> extends DataBindMsg<T> {
  private btns:Array<IBtn>[] = [];
  private handlerMap:Map<string,BtnHandler> = new Map();
  constructor(chatId:number,data:T,msgId?:number) {
    super(chatId,data,msgId);
    this.bot.addListener('callback_query',this.callbakHandler)
  }
  private callbakHandler = (msg:CallbackQuery)=> {
    
    if (msg.from.id !== this.chatId) return;
    if (msg.message!.message_id !== this.msgId) return;
    const arr = msg.data?.split(':')??['-']
    const [name,...params] = arr
    
    const handler = this.handlerMap.get(name)
    if (handler) {
      if(handler.call) {
        handler.call(this,params)
      } else {
        handler(params)
      }
    }
  }
  setBtns(btns:Array<IBtn>[]){
    this.btns = btns
  }
  setHandler(name:string,handler:BtnHandler){
    this.handlerMap.set(name,handler)
  }
  removeHandler(name:string) {
    this.handlerMap.delete(name)
  }
  protected updateSelf(): void {
    if (!this.render) return
    const {text,opts} = this.render(this.data)
    const btns = this.btns.map(arr=>{
      return arr.map(item=> ({
        text: item.name,
        callback_data: `${item.id}:${item.params.join(':')}`
      }))
    })
    if (this.msgId) {
      this.bot.editMessageText(text,{
        reply_markup: {
          inline_keyboard: btns
        },
        ...opts as EditMessageTextOptions,
        message_id: this.msgId,
        chat_id: this.chatId
      })    
    } else {
      this.bot.sendMessage(this.chatId,text,{reply_markup:{
        inline_keyboard: btns
      },...opts}).then(res=>{
        this.msgId = res.message_id
      })
    }
  }
  destory() {
    if (this.msgId) {
      this.bot.deleteMessage(this.chatId,this.msgId)
    }
    this.bot.removeListener('callback_query',this.callbakHandler)
  }
}

export function CreateBtnAndDataBindMsg<T>(chatId:number,data:T,msgId?:number){
  return new BtnBindMsg<T>(chatId,data,msgId)
}