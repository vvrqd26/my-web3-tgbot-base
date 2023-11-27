import { MULTISIG_SIZE } from "npm:@solana/spl-token";
import { IBaseContext } from "./context.ts";

export type Middleware = <C extends IBaseContext>(ctx:C,next?:()=>void)=>Promise<void>|void
export type MiddlewareStack = Array<Middleware>

export const execMiddlewareStack = <C extends IBaseContext>(stack:MiddlewareStack,ctx:C) => {
    let index = 0
    const next = () => {
        if (index < stack.length) {
            stack[index++](ctx,next)
        }
    }
    next()
}