import { IBaseContext } from "./context.ts";
import { context } from "./index.ts";
type SceneEventHandler = <C>(ctx:C)=>void
export class Scene<C extends IBaseContext> {
    onEnterHandler?:SceneEventHandler
    onLeaveHandler?:SceneEventHandler
    id:string
    constructor (id:string) {
        this.id = id
    }
    enter(ctx:C) {
        context.set(ctx.chatID,{sceneID:this.id})
        this.onEnterHandler && this.onEnterHandler(ctx)
    }
    leave(ctx:C) {
        context.set(ctx.chatID,{sceneID:'main'})
        this.onLeaveHandler && this.onLeaveHandler
    }
}