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
        <p>${userWallet?.balance || "0"}</p> {/* Ensure this value is dynamic and comes from the store */}
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














// import { Button } from "@/components/ui/button";
// import { DialogClose } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { withdrawalRequest } from "@/State/Withdrawal/Action";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";

// const WithdrawalForm=()=>{
//     const dispatch=useDispatch();
//     const {wallet,withdrawal}=useSelector(store=>store);
//         const [amount ,setAmount]=React.useState('');
//         const handleChange=(e)=>{
//             setAmount(e.target.value)
//         }
    
//  const handleSubmit=(e)=>{
//     dispatch(withdrawalRequest({amount,jwt:localStorage.getItem("jwt")}))
//     console.log(amount);
//  }
//   //For showing ***** in acc number
//   const maskAccountNumber = (accountNumber) => {
//     const visibleDigits = 4; 
//     const maskedPart = "*".repeat(accountNumber.length - visibleDigits);
//     const visiblePart = accountNumber.slice(-visibleDigits);
//     return maskedPart + visiblePart;
//   };
//     return(
// <div className="pt-10 space-y-5">
// <div className="flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4">
//     <p>Available Balance</p>
//     <p>$9000</p>
// </div>
// <div className="flex flex-col items-center">
//     <h1>Enter Withdrawal Amount</h1>
//     <div className="flex items-center justify-center">
//         <Input onChange={handleChange}
//         value={amount}
//         className="withdrawalInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center"
//         placeholder="$9999"
//         type="number"/>
//     </div>
// </div>
// <div >
// <p className="pb-2">Transfer to</p>
// <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
//     <img className="h-9 w-9" src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png" />
//     <div>
// <p className="text-xl font-bold">{withdrawal.paymentDetails?.bankName.toUpperCase()}</p>
// <p className="text-sm">
// {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
// </p>
//     </div>
// </div>
// </div>
// <DialogClose className="w-full ">
// <Button onClick={handleSubmit} className="w-full py-7 text-xl">
//     Withdraw
// </Button>
// </DialogClose>

// </div>
//     )
// }
// export default WithdrawalForm