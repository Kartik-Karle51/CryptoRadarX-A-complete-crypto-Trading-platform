import React, { useEffect } from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AvatarImage,Avatar } from "@radix-ui/react-avatar";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addItemToWatchlist, getUserWatchlist } from "@/State/WatchList/Action";

import { useNavigate } from "react-router-dom";


const Watchlist = ()=>{
  const {watchlist}=useSelector(store=>store);
  const navigate=useNavigate();
const dispatch=useDispatch()
    const handleRemoveToWatchlist=(value)=>{
      dispatch(addItemToWatchlist({coinId:value,jwt:localStorage.getItem("jwt")}))
        console.log(value);
    }
useEffect(()=>{
  dispatch(getUserWatchlist(localStorage.getItem("jwt")))
},[])

const handleRowClick = (coinId) => {
  navigate(`/market/${coinId.toLowerCase()}`);
};
    return(
        <div className="p-5 lg:px-20">
        <h1 className="font-bold text-3xl pb-5">Watchlist</h1>
   <Table className="border">
   
     <TableHeader>
       <TableRow>
         <TableHead className="py-5">COIN</TableHead>
         <TableHead>SYMBOL</TableHead>
         <TableHead>VOLUME</TableHead>
         <TableHead>MARKET CAP</TableHead>
         <TableHead>24H</TableHead>
         <TableHead>PRICE</TableHead>
         <TableHead className="text-right text-red-600">REMOVE</TableHead>
       </TableRow>
     </TableHeader>
     <TableBody>
       {watchlist.items.map((item,index)=><TableRow 
        onClick={() => handleRowClick(item.name)} 
        className="cursor-pointer hover:bg-blue-100 hover:text-black transition-colors duration-200">
         <TableCell className="font-medium ">
           <Avatar className="-z-50 flex items-center gap-2">
               <AvatarImage src={item.image}className="h-9 w-9"/>
               <span>{item.name}</span>
           </Avatar>
         </TableCell>
         <TableCell>{item.symbol.toUpperCase()}</TableCell>
         <TableCell>{item.total_volume}</TableCell>
         <TableCell>{item.market_cap}</TableCell>
         <TableCell> {item.price_change_percentage_24h}</TableCell>
         <TableCell >${item.
current_price}</TableCell>
         <TableCell className="text-right">
<Button variant="ghost" onClick={()=>handleRemoveToWatchlist(item.id)} size="icon" className="h-10 w-10 ">
 
    <BookmarkFilledIcon className="w-6 h-6"/>
</Button>
         </TableCell>
         
       </TableRow>)}
       
     </TableBody>
   </Table>
    </div>
    )
}
export default Watchlist