'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const AboutPage = () => {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>About BUYong</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            BUYong is an e-commerce platform dedicated to showcasing local Filipino products from Cagayan de Oro and beyond.
            Our mission is to promote Filipino craftsmanship and provide a convenient way for customers to discover and purchase unique items.
          </CardDescription>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Our Vision</h3>
            <p>To be the leading online marketplace for local Filipino products, fostering economic growth for local artisans and providing customers with quality, authentic goods.</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <p>Email: buyong@example.com</p>
            <p>Phone: +63 912 345 6789</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
