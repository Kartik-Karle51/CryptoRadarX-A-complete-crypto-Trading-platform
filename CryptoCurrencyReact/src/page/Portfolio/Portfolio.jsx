import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AvatarImage, Avatar } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/State/Asset/Action";

const Portfolio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { asset } = useSelector(store => store);

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, []);

  const handleRowClick = (coinId) => {
    navigate(`/market/${coinId.toLowerCase()}`);
  };

  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Portfolio</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Coin Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Change %</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {asset.userAssets.map((item, index) => (
            <TableRow
              key={index}
              onClick={() => handleRowClick(item.coin.id)} 
              className="cursor-pointer hover:bg-blue-100 hover:text-black transition-colors duration-200"
            >
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={item.coin.image} className="w-10 h-10 rounded-full" />
                </Avatar>
                <span>{item.coin.name}</span>
              </TableCell>
              <TableCell>{item.coin.symbol.toUpperCase()}</TableCell>
              <TableCell>{item.quantity.toFixed(4)}</TableCell>
              <TableCell>{item.coin.price_change_24h}</TableCell>
              <TableCell>{item.coin.price_change_percentage_24h}</TableCell>
              <TableCell>{item.coin.total_volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
