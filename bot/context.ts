import { db } from "../index.ts";

export interface IBaseContext {
    sceneID?:string
    chatID: number
}

export const get = async <C extends IBaseContext>(chatID:number,keys:Array<keyof C>) => {
    const res:Partial<C> = {}
    await Promise.all(keys.map(async key=> {
        const v = (await  db.get(['context',chatID,key as string|number])).value
        res[key] = v as C[typeof key]|undefined
    })) 
    return res
}
export const set = <C extends IBaseContext>(chatID:number,ctx:Partial<C>)=> {
    for (const key in ctx) {
        db.set(['context',chatID,key],ctx[key])
    }
}