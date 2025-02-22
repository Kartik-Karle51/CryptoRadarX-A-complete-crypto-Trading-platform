import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchCoin = () => {
  const [searchTerm, setSearchTerm] = useState("");  // State to store the search input
  const navigate = useNavigate();  // Hook to navigate to the StockDetails page

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/market/${searchTerm.trim()}`);  // Navigate to StockDetails page for the searched coin
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Search for a Coin</h1>
      <Input
        type="text"
        placeholder="Enter coin name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}  // Update search term
        className="w-60 p-2 border rounded-md"
      />
      <Button onClick={handleSearch} className="w-60">
        Search
      </Button>
    </div>
  );
};

export default SearchCoin;