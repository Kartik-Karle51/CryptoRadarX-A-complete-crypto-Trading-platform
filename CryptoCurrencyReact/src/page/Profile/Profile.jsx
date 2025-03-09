import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VerifiedIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const Profile = () => {

    const {auth}=useSelector(store=>store);



    return (
        <div className="flex flex-col items-center mb-5">
            <div className="pt-10 w-full lg:w-[60%]">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Your Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="lg:flex gap-32">
                            <div className="space-y-7">
                                <div className="flex ">

                                    <p className="w-[9rem]">Email : </p>
                                    <p className="text-gray-500">{auth.user?.email}</p></div>

                                <div className="flex ">

                                    <p className="w-[9rem]">Full Name : </p>
                                    <p className="text-gray-500">{auth.user?.fullName}</p></div>

                                <div className="flex ">

                                    <p className="w-[9rem]">Phone No : </p>
                                    <p className="text-gray-500">{auth.user?.mobileNo || "N/A"}</p></div>

                                <div className="flex ">

                                    <p className="w-[9rem]">Nationality : </p>
                                    <p className="text-gray-500">{auth.user?.nationality || "N/A"}</p></div>
                            </div>
                            <br />

                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
export default Profile