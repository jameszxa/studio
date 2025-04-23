"use client";

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from "@/components/ui/button";
import Link from 'next/link';

const TrackOrderPage = () => {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Track Order</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Track your order using your order number and email address.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Shipping Details</h3>
            <p>Estimated Delivery Time: 2-3 business days</p>
            <p>Shipping Number 12345</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Shipping Partners</h3>
            <ul>
              <li>LBC</li>
              <li>J&amp;T Express</li>
            </ul>
          </div>
            <Button asChild>
              <Link href="/checkout">Back to Checkout</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackOrderPage;
