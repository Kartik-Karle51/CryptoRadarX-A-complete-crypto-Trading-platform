import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AvatarImage, Avatar } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForUser } from "@/State/Order/Action";
import { calculateProfit } from "@/utils/calculateProfit";
import { useNavigate } from "react-router-dom";

const Activity = () => {
  const { order } = useSelector((store) => store);
  const dispatch = useDispatch();
const navigate=useNavigate();
  useEffect(() => {
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, []);


  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return {
      date: date.toISOString().split("T")[0],
      time: date.toLocaleTimeString(), 
    };
  };
  const handleRowClick = (coinId) => {
    navigate(`/market/${coinId.toLowerCase()}`);
  };
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Activity</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="py-5">Date & Time</TableHead>
            <TableHead>Coin Name</TableHead>
            <TableHead>Buy Price</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Order Type</TableHead>
            <TableHead>Profit/Loss</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.orders.map((item, index) => {
            const formattedDateTime = formatDate(item.timeStamp);
            return (
              <TableRow key={index}
               onClick={() => handleRowClick(item.orderItem.coin.name)} 
              className="cursor-pointer hover:bg-blue-100 hover:text-black transition-colors duration-200"
              >
                <TableCell>
                  <p>{formattedDateTime.date}</p>
                  <p className="text-gray-400">{formattedDateTime.time}</p>
                </TableCell>
                <TableCell className="font-medium">
                  <Avatar className="flex items-center gap-2">
                    <AvatarImage src={item.orderItem.coin.image} className="w-10 h-10 rounded-full" />
                    <span>{item.orderItem.coin.name}</span>
                  </Avatar>
                </TableCell>
                <TableCell>${item.orderItem.buyPrice}</TableCell>
                <TableCell>{item.orderItem.sellPrice}</TableCell>
                <TableCell>{item.orderType}</TableCell>
                <TableCell
    className={parseFloat(calculateProfit(item)) > 0 
        ? "text-green-500" 
        : parseFloat(calculateProfit(item)) < 0 
        ? "text-red-500" 
        : "text-gray-500"
    }
>
    {calculateProfit(item)}
</TableCell>
                <TableCell className="text-right">{item.price}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;
