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

const AuthPage = () => {
  return (
    <div className="grid h-screen place-items-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>Choose an option to proceed</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button asChild>
            <Link href="/auth/create-account">Create Account</Link>
          </Button>
          <div className='p-6'>
                    Already an account? <Link href="/auth/sign-in">Sign In</Link>
                </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
