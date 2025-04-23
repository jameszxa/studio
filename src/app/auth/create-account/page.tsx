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
import { useRouter } from 'next/navigation';
import { createUser } from '@/services/user-service'; // Import createUser

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
            await createUser(values.email, values.password); // Call createUser
            toast({
                title: "Account created successfully!",
                description: "You can now sign in to your new account.",
            });
            router.push('/auth/sign-in'); // Redirect to sign-in page
        } catch (error: any) {
            console.error("Account creation error:", error);


            // Redirect to account settings page

            toast({
                variant: "destructive",
                title: "Error creating account.",
                description: "Failed to create account. Please check your credentials or try again later.",
            });
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
        <div className='p-6'>
                    Already an account? <Link href="/auth/sign-in">Sign In</Link>
                </div>
      </Card>
    </div>
  );
};

export default CreateAccountPage;
