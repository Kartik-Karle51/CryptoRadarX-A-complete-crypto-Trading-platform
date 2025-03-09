import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/State/Auth/Action";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"; 
import * as yup from "yup";


const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
});

const SignInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(schema), 
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        dispatch(login({data, navigate})); 
        console.log(data);
    };

    return (
        <div>
            <h1 className="text-xl font-bold text-center pb-3">Sign In</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                   
                    <FormField control={form.control} name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="abc@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />{/*Shows validation error*/}
                            </FormItem>
                        )}
                    />

                
                    <FormField control={form.control} name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        className="border w-full border-gray-700 p-5"
                                        type="password" 
                                        placeholder="**********" {...field} />
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
}

export default SignInForm;















