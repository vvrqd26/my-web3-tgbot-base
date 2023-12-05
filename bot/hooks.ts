const ContextMap = new Map<number,Record<string,unknown>>()

export const getContext = <T>(id:number,key:string) => {
    if (!ContextMap.has(id)) {
        ContextMap.set(id,{})
    }
    const map = ContextMap.get(id) ?? {}
    return map[key] as T
}

export const setContext = <T>(id:number,key:string,value:T) => {
    if (!ContextMap.has(id)) {
        ContextMap.set(id,{})
    }
    const map = ContextMap.get(id) ?? {}
    map[key] = value
    ContextMap.set(id,map)
    return value
}


