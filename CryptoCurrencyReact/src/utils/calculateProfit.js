export const calculateProfit=(order)=>{
   if(order &&  order.orderItem?.buyPrice && order.orderItem?.sellPrice){
const amount= order.orderItem?.sellPrice - order.orderItem?.buyPrice;

return amount.toFixed(3);
   }
   return "-"
}