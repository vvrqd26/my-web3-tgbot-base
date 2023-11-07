import { bot } from "./index.ts"
import { EditMessageTextOptions } from "npm:@types/node-telegram-bot-api"
export class DataBindMsg<T> {
  protected msgId?:number
  protected chatId:number
  private _data:T
  protected bot = bot
  constructor (chatId:number,data:T,msgId?:number,) {
    this.msgId = msgId
    this.chatId = chatId
    this._data = data
  }
  render?:(d:T)=>({text:string,opts:EditMessageTextOptions})
  setData(data:Partial<T>) {
    this._data = {...this._data,...data}
    this.updateSelf()
  }
  set data(data:T) {
    this._data = data
    this.updateSelf()
  }
  get data() {
    return this._data
  }
  
  protected updateSelf() {
    if (!this.render) return
    const {text,opts} = this.render(this._data)
    if (this.msgId) {
      this.bot.editMessageText(text,{
        ...opts as EditMessageTextOptions,
        message_id: this.msgId,
        chat_id: this.chatId
      })    
    } else {
      this.bot.sendMessage(this.chatId,text,opts).then(res=>{
        this.msgId = res.message_id
      })
    }
  }
}

export function createBindDataMsg<T>(data:T,chatId:number,msgId?:number){
  return new DataBindMsg<T>(chatId,data,msgId)
}