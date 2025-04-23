'use client';

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Link from 'next/link';

const MyOrdersPage = () => {
  const orders = [
    {
      id: '1',
      date: '2024-01-20',
      total: '1500.00',
      status: 'Delivered',
      items: [
        {name: 'Product 1', quantity: 2},
        {name: 'Product 2', quantity: 1},
      ],
    },
    {
      id: '2',
      date: '2024-01-15',
      total: '800.00',
      status: 'Shipped',
      items: [{name: 'Product 3', quantity: 1}],
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>PHP {order.total}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {order.items.map(item => (
                      <div key={item.name}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/order/${order.id}`} className="text-primary">
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyOrdersPage;
