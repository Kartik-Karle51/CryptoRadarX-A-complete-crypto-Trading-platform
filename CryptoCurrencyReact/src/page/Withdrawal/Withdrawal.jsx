import React, { useEffect } from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AvatarImage,Avatar } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { getWithdrawalHistory } from "@/State/Withdrawal/Action";
const Withdrawal = ()=>{
  const dispatch=useDispatch();
    const {wallet,withdrawal}=useSelector(store=>store);
    useEffect(()=>{
      dispatch(getWithdrawalHistory(localStorage.getItem("jwt")))
    },[])
    return(
        <div className="p-5 lg:px-20">
        <h1 className="font-bold text-3xl pb-5">Withdrawal</h1>
   <Table className="border">
   
     <TableHeader>
       <TableRow>
         <TableHead className="py-5">Date</TableHead>
        
         <TableHead>Amount</TableHead>
         
       </TableRow>
     </TableHeader>
     <TableBody>
       {withdrawal.history.map((item,index)=><TableRow>
        <TableCell>
            <p>
            {item.date.toString()} </p>
            </TableCell>
       
   
         <TableCell>${item.amount}</TableCell>
      
         
       </TableRow>)}
       
     </TableBody>
   </Table>
    </div>
    )
}
export default Withdrawal