"use client";

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from "@/components/ui/button";
import Link from 'next/link';

const OrderConfirmationPage = () => {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Thank You for Your Order!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your order has been successfully placed and is being processed.</p>
          <p>You will receive an email confirmation with your order details shortly.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <p>Order Number: #123456789</p>
            <p>Estimated Delivery: 2-3 business days</p>
            <p>Total Amount: PHP 1500.00</p>
          </div>
            {/*Track order is not functional, it's a place holder*/}
            <Link href="/track-order" className="text-primary hover:underline">
                Track Your Order
            </Link>
          <div className="mt-4">
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmationPage;
