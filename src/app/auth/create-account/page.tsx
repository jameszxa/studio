"use client";

import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";
import {
    createUserWithEmailAndPassword,
  } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';

const CreateAccountPage = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();

    const formSchema = z.object({
      email: z.string().email({ message: "Please enter a valid email address." }),
      password: z.string().min(8, { message: "Password must be at least 8 characters." })
        .refine((password) => {
          const hasNumber = /\d/.test(password);
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
          return hasNumber && hasSpecialChar;
        }, {
          message: "Password must contain at least one number and one special character.",
        }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true);
      try {
        if (!auth) {
          toast({
            variant: "destructive",
            title: "Error creating account.",
            description: "Firebase authentication not initialized. Please try again later.",
          });
          setIsLoading(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        toast({
          title: "Account created successfully!",
          description: "You can now sign in to your new account.",
        });
        router.push('/');
      } catch (error: any) {
        console.error("Firebase authentication error:", error);
  
        // Improved error handling
        if (error.code === 'auth/email-already-in-use') {
          toast({
            variant: "destructive",
            title: "Error creating account.",
            description: "This email is already in use. Please use a different email or sign in.",
          });
        } else if (error.code === 'auth/weak-password') {
          toast({
            variant: "destructive",
            title: "Error creating account.",
            description: "The password is too weak. Please use a stronger password.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error creating account.",
            description: "Failed to create account. Please check your credentials or try again later.",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="grid h-screen place-items-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Enter your email and password below to create your account</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
            {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
          </div>
          <div className="grid gap-2">
            <label htmlFor="password">Password</label>
            <Input id="password" type="password" placeholder="Password" {...register("password")} />
            {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
          </div>
          <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
                    {isLoading && (
                        <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create Account
                </Button>
        </CardContent>
        
      </Card>
    </div>
  );
};

export default CreateAccountPage;
