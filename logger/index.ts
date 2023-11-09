import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
export default {
  info: function(...args: any[]) {
    return console.info(moment(Date.now()).format('YY/MM/DD HH:mm:ss'),...args);
  },
  error: function(...args: any[]) {
    return console.error(moment(Date.now()).format('YY/MM/DD HH:mm:ss'),...args);
  },
  debug: function(...args: any[]) {
    return console.debug(moment(Date.now()).format('YY/MM/DD HH:mm:ss'),...args);
  },
};