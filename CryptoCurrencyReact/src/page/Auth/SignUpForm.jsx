import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/State/Auth/Action";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    nationality: yup.string().required("Nationality is required"),
    mobileNo: yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
});

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            nationality: "",
            mobileNo: "",
        },
    });

    const onSubmit = (data) => {
        dispatch(register(data, navigate));
        console.log(data);
    };

    return (
        <div>
            <h1 className="text-xl font-bold text-center pb-3">Sign Up</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    
                    <FormField control={form.control} name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="border w-full border-gray-700 p-5"
                                        placeholder="Enter Your Full Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    
                    <FormField control={form.control} name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="border w-full border-gray-700 p-5"
                                        placeholder="abc@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    
                    <FormField control={form.control} name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="border w-full border-gray-700 p-5"
                                        type="password"
                                        placeholder="**********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    
                    <FormField control={form.control} name="nationality"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="border w-full border-gray-700 p-5"
                                        placeholder="Enter your nationality" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    
                    <FormField control={form.control} name="mobileNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="border w-full border-gray-700 p-5"
                                        placeholder="Enter your mobile number"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full py-5">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default SignUpForm;


