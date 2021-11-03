export function makeId(length = 5) {
   let txt = ''
   let poss = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   do {
      txt += poss.charAt(Math.random() * poss.length)
      length--
   } while (length > 0)
   return txt
}