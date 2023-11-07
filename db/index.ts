const STORAGE = Deno.env.get("STORAGE") || "./storage"
export const db = await Deno.openKv(STORAGE)