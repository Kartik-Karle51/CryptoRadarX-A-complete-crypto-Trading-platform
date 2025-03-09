import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchCoin = () => {
  const [searchTerm, setSearchTerm] = useState("");  
  const navigate = useNavigate(); 

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/market/${searchTerm.trim().toLowerCase()}`); 
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Search for a Coin</h1>
      <Input
        type="text"
        placeholder="Enter coin name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="w-60 p-2 border rounded-md"
      />
      <Button onClick={handleSearch} className="w-60">
        Search
      </Button>
    </div>
  );
};

export default SearchCoin;