
import { ScrollArea } from "@/components/ui/scroll-area";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { AvatarImage,Avatar } from "@radix-ui/react-avatar";

import React from "react";


import { useNavigate } from "react-router-dom";

const AssetTable = ({coin,category}) =>{

  const navigate=useNavigate();

  const handleRowClick = (coinId) => {
    navigate(`/market/${coinId.toLowerCase()}`);
  };

    return (
<Table>
<ScrollArea className={`${category=="all"?"h-[77.3vh]":"h-[82vh]"}`}>
<TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">COIN</TableHead>
      <TableHead>SYMBOL</TableHead>
      <TableHead>VOLUME</TableHead>
      <TableHead>MARKET CAP</TableHead>
      <TableHead>Last 24H</TableHead>
      <TableHead className="text-right">PRICE</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {coin.map((item,index)=><TableRow key={item.id}
    onClick={() => handleRowClick(item.name)} 
              className="cursor-pointer hover:bg-blue-100 hover:text-black transition-colors duration-200"
    >
      <TableCell onClick={()=>navigate(`/market/${item.id}`)} className="font-medium ">
        <Avatar className="-z-50 flex items-center gap-2">
            <AvatarImage src={item.image} className="h-9 w-9"/>
            <span>{item.name}</span>
        </Avatar>
      </TableCell>
      <TableCell className="text-center">{item.symbol.toUpperCase()}</TableCell>
      <TableCell>{item.total_volume}</TableCell>
      <TableCell>{item.market_cap}</TableCell>
      <TableCell>{item.price_change_percentage_24h}</TableCell>
      <TableCell className="text-right">${item.current_price}</TableCell>
    </TableRow>)}
    
  </TableBody>
</ScrollArea>
 
</Table>

    )
}

export default AssetTable