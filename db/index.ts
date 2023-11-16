const STORAGE = Deno.env.get("STORAGE")
export const db = await Deno.openKv(STORAGE)