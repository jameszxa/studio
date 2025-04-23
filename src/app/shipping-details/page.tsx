"use client";

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from "@/components/ui/button";
import Link from 'next/link';

const ShippingDetailsPage = () => {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We offer shipping within Cagayan de Oro and throughout the Philippines.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Shipping Costs</h3>
            <p>Cagayan de Oro: PHP 50.00</p>
            <p>Other areas in the Philippines: PHP 150.00</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Estimated Delivery Times</h3>
            <p>Cagayan de Oro: 2-3 business days</p>
            <p>Other areas in the Philippines: 5-7 business days</p>
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

export default ShippingDetailsPage;
