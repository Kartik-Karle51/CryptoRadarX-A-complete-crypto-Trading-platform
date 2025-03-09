import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { withdrawalRequest } from "@/State/Withdrawal/Action";

const WithdrawalForm = () => {
  const dispatch = useDispatch();
  const { withdrawal, loading, error } = useSelector((store) => store.withdrawal);
  const {userWallet}=useSelector((store)=>store.wallet);
  const [amount, setAmount] = useState("");

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    if (amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    dispatch(withdrawalRequest({ amount, jwt: localStorage.getItem("jwt") }));
  };

  return (
    <div className="pt-10 space-y-5">
      <div className="flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4">
        <p>Available Balance</p>
        <p>${userWallet?.balance || "0"}</p> 
      </div>
      <div className="flex flex-col items-center">
        <h1>Enter Withdrawal Amount</h1>
        <div className="flex items-center justify-center">
          <Input
            onChange={handleChange}
            value={amount}
            className="withdrawalInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center"
            placeholder="$9999"
            type="number"
          />
        </div>
      </div>
    

      <DialogClose className="w-full ">
        <Button onClick={handleSubmit} className="w-full py-7 text-xl" disabled={loading}>
          {loading ? "Processing..." : "Withdraw"}
        </Button>
      </DialogClose>
    </div>
  );
};

export default WithdrawalForm;
