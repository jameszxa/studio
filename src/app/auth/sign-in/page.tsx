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
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();

    const formSchema = z.object({
        email: z.string().email({ message: "Please enter a valid email address." }),
        password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

      const onSignIn = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
          await signInWithEmailAndPassword(auth, values.email, values.password);
          toast({
            title: "Sign in successfully!",
            description: "You are now signed in.",
          });
          router.push('/');
        } catch (error: any) {
            console.error("Firebase sign-in error:", error);

            // Improved error handling for sign-in
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                toast({
                    variant: "destructive",
                    title: "Error signing in.",
                    description: "Invalid credentials. Please double-check your email and password.",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error signing in.",
                    description: "Failed to sign in. Please check your credentials or try again later.",
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
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in with your email and password</CardDescription>
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
          <Button onClick={handleSubmit(onSignIn)} disabled={isLoading}>
                    {isLoading && (
                        <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign In
                </Button>
        </CardContent>
        <div className='p-6'>
                    Don't have an account? <Link href="/auth/create-account">Create Account</Link>
                </div>
      </Card>
    </div>
  );
};

export default SignInPage;
