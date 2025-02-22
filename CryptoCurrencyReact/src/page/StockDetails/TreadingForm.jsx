import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAssetDetails, getUserAssets } from "@/State/Asset/Action";
import { payOrder, getAllOrdersForUser } from "@/State/Order/Action";
import { getUserWallet } from "@/State/Wallet/Action";
import { DotFilledIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TreadingForm = () => {
    const [amount, setAmount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [orderType, setOrderType] = useState("BUY");
    const [error, setError] = useState("");
    const { coin, wallet, asset } = useSelector(store => store);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserWallet(localStorage.getItem("jwt")));
        dispatch(getUserAssets(localStorage.getItem("jwt")));
        dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
        if (coin?.coinDetails?.id) {
            dispatch(getAssetDetails({ coinId: coin.coinDetails.id, jwt: localStorage.getItem("jwt") }));
        }
    }, [dispatch, coin?.coinDetails?.id]);

    const handleChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setAmount(value);
        const volume = calculateBuyCost(value, coin.coinDetails?.market_data?.current_price?.usd);
        setQuantity(volume);
    };

    const calculateBuyCost = (amount, price) => {
        let volume = amount / price;
        let decimalPlaces = Math.max(2, price.toString().split(".")[0].length);
        return volume.toFixed(decimalPlaces);
    };

    const handleTransaction = () => {
        if (orderType === "BUY" && amount > wallet.userWallet?.balance) {
            setError("Insufficient Wallet Balance");
            return;
        }
        if (orderType === "SELL" && quantity > (asset.assetDetails?.quantity || 0)) {
            setError("Insufficient Quantity to Sell");
            return;
        }
        setError("");
        dispatch(payOrder({
            jwt: localStorage.getItem("jwt"),
            amount,
            orderData: {
                coinId: coin.coinDetails?.id,
                quantity,
                orderType,
            },
        })).then(() => {
            dispatch(getUserWallet(localStorage.getItem("jwt")));
            dispatch(getUserAssets(localStorage.getItem("jwt")));
            dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
        });
    };

    return (
        <div className="space-y-10 p-5">
            <div>
                <div className="flex gap-4 items-center justify-between">
                    <Input
                        className="py-7 focus:outline-none"
                        placeholder={orderType === "BUY" ? "Enter Amount..." : "Enter Quantity..."}
                        onChange={handleChange}
                        type="number"
                        name="amount"
                    />
                    <div>
                        <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">{quantity}</p>
                    </div>
                </div>
                {error && <h1 className="text-red-600 text-center pt-4">{error}</h1>}
            </div>

            <div className="flex gap-5 items-center">
                <Avatar>
                    <AvatarImage
                        src={coin.coinDetails?.image?.small || "default-image-url.png"}
                        alt={coin.coinDetails?.name}
                    />
                </Avatar>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-bold">{coin.coinDetails?.symbol?.toUpperCase()}</p>
                        <DotFilledIcon className="text-gray-400" />
                        <p className="text-gray-400">{coin.coinDetails?.name}</p>
                    </div>
                    <div className="flex items-end gap-2">
                        <p className="text-xl font-bold">${coin.coinDetails?.market_data?.current_price?.usd}</p>
                        <p className={coin.coinDetails?.market_data?.price_change_percentage_24h < 0 ? "text-red-600" : "text-green-500"}>
                            <span>{coin.coinDetails?.market_data?.price_change_24h?.toFixed(2)}</span>
                            <span> ({coin.coinDetails?.market_data?.price_change_percentage_24h?.toFixed(2)}%)</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <p>Order Type</p>
                <p>Market Order</p>
            </div>
            <div className="flex items-center justify-between">
                <p>{orderType === "BUY" ? "Available Cash" : "Available Quantity"}</p>
                <p>{orderType === "BUY" ? "$" + wallet.userWallet?.balance : (asset.assetDetails?.quantity || 0)}</p>
            </div>
            <div>
                <Button onClick={handleTransaction} className={`w-full text-md py-6 ${orderType === "SELL" ? "bg-red-600 text-white hover:text-red-600" : "bg-green-500"}`}>
                    {orderType}
                </Button>
                <Button
                    variant="link"
                    className="w-full mt-5 text-xl"
                    onClick={() => {
                        setOrderType(orderType === "BUY" ? "SELL" : "BUY");
                        setAmount(0);
                        setQuantity(0);
                        setError("");
                    }}>
                    {orderType === "BUY" ? "Or Sell" : "Or Buy"}
                </Button>
            </div>
        </div>
    );
};

export default TreadingForm;




