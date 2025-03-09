import React, { useEffect } from "react";
import "./Auth.css";
import SignUpForm from "./SignUpForm";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import SignInForm from "./SignInForm";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen relative authContainer">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#030712] bg-opacity-50">
        <div className="bgBlur absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-md z-50 bg-black bg-opacity-50 shadow-2xl shadow-white px-10">
          <h1 className="text-6xl font-bold pb-9">Crypto Radar</h1>

          {location.pathname === "/signup" ? (
            <section className="w-full">
              <SignUpForm />
              <div className="flex items-center justify-center">
                <span>Already have an Account</span>
                <Button
                  className="m-4"
                  onClick={() => navigate("/signin")}
                  variant="ghost"
                >
                  SignIn
                </Button>
              </div>
            </section>
          ) : (
            <section className="w-full">
              <SignInForm />
              <div className="flex items-center justify-center">
                <span>Don't have an Account?</span>
                <Button
                  className="m-4"
                  onClick={() => navigate("/signup")}
                  variant="ghost"
                >
                  Sign Up
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
