"use client";

import React, { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Input from "../../components/inputs/Input";
import Button from "../../components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = "LOGIN" | "REGISTER";

type Props = {};

const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required("First name is required"),
  password: Yup.string().required("Password is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const AuthForm = (props: Props) => {
  const [variant, setVariant] = useState<Variant>("REGISTER");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((value: Variant) => (value === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, []);

  const registerForm = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(registerValidationSchema),
  });
  const loginForm = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // Axios register
    }
    if (variant === "LOGIN") {
      // nextAuth signIn
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    //NextAuth social singIn
  };
  return (
    <div
      className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
        "
    >
      <div
        className="
        bg-white 
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
        "
      >
        <form
          className="space-y-6"
          onSubmit={
            variant === "LOGIN"
              ? loginForm.handleSubmit(onSubmit)
              : registerForm.handleSubmit(onSubmit)
          }
        >
          {variant === "REGISTER" ? (
            <>
              <Input
                label="Name"
                id="name"
                register={registerForm.register}
                errors={registerForm.formState.errors}
                disabled={isLoading}
                required
              />
              <Input
                label="Email"
                id="email"
                type="email"
                register={registerForm.register}
                errors={registerForm.formState.errors}
                disabled={isLoading}
                required
              />
              <Input
                label="Password"
                id="password"
                type="password"
                register={registerForm.register}
                errors={registerForm.formState.errors}
                disabled={isLoading}
                required
              />
            </>
          ) : (
            <>
              <Input
                label="Email"
                id="email"
                type="email"
                register={loginForm.register}
                errors={loginForm.formState.errors}
                disabled={isLoading}
                required
              />
              <Input
                label="Password"
                id="password"
                type="password"
                register={loginForm.register}
                errors={loginForm.formState.errors}
                disabled={isLoading}
                required
              />
            </>
          )}
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign In" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute
                inset-0
                flex
                items-center
            "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center tex-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <div
          className="
          flex 
          gap-2 
          justify-center 
          text-sm 
          mt-6 
          px-2 
          text-gray-500
        "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
