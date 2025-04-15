'use client';

import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Search, Mic, Package, Users, ListChecks, Store, Share2, MessageSquare, HelpCircle, Wallet, ShoppingBag} from 'lucide-react';
import Link from 'next/link';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const SellerDashboardPage = () => {
  return (
    <div className="flex h-screen bg-white text-black">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 flex items-center space-x-2 font-semibold">
          <Link href="/" className="flex items-center space-x-2 font-semibold">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/buyong_logo.png" alt="BUYong Logo"/>
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <span>BUYong</span>
          </Link>
        </div>

        <div className="flex-1 p-4 space-y-1">
          <Button variant="ghost" className="justify-start w-full font-normal rounded-md hover:bg-yellow-200" data-active="true">
            <ShoppingBag className="mr-2 h-4 w-4"/>
            Overview
          </Button>
          <Button variant="ghost" className="justify-start w-full font-normal rounded-md hover:bg-yellow-200">
            <Package className="mr-2 h-4 w-4"/>
            Products
          </Button>
          <Button variant="ghost" className="justify-start w-full font-normal rounded-md hover:bg-yellow-200">
            <Users className="mr-2 h-4 w-4"/>
            Customer
          </Button>
          <Button variant="ghost" className="justify-start w-full font-normal rounded-md hover:bg-yellow-200">
            <ListChecks className="mr-2 h-4 w-4"/>
            Orders
          </Button>
          <Button variant="ghost" className="justify-start w-full font-normal rounded-md hover:bg-yellow-200">
            <Share2 className="mr-2 h-4 w-4"/>
            Shipment
          </Button>
          <Button variant="ghost" className="justify-start w-full font-normal rounded-md hover:bg-yellow-200">
            <Store className="mr-2 h-4 w-4"/>
            Store Setting
          </Button>
          <Button variant="ghost" className="justify-start w-full font-normal rounded-md hover:bg-yellow-200">
            <Users className="mr-2 h-4 w-4"/>
            Platform Partner
          </Button>
          <Button variant="ghost" className="justify-start w-full font-normal rounded-md hover:bg-yellow-200">
            <MessageSquare className="mr-2 h-4 w-4"/>
            Feedback
          </Button>
          <Button variant="ghost" className="justify-start w-full font-normal rounded-md hover:bg-yellow-200">
            <HelpCircle className="mr-2 h-4 w-4"/>
            Help &amp; Support
          </Button>
           <Link href="/seller-dashboard/withdraw" className="justify-start w-full font-normal rounded-md hover:bg-yellow-200" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <Button variant="ghost" className="justify-start w-full font-normal rounded-md hover:bg-yellow-200">
              <Wallet className="mr-2 h-4 w-4" />
              Withdraw
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Input type="text" placeholder="Search..." className="max-w-md rounded-full bg-white border-gray-300"/>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-gray-500"/>
            </Button>
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5 text-gray-500"/>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="Seller Profile"/>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold">John Doe</div>
              <div className="text-xs text-gray-500">john.doe@example.com</div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Welcome back, John!</h1>
          <p className="text-gray-500">Here's Your Current Sales Overview</p>
        </div>

        {/* Sales Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle className="text-white">AVG. Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">₱0.00</div>
              <p className="text-sm text-gray-400">From last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle className="text-white">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">0.00</div>
              <p className="text-sm text-gray-400">From last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle className="text-white">Lifetime Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">₱0.00</div>
              <p className="text-sm text-green-500">+2.24% From last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Overtime Chart and Available Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Sales Overtime Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Overtime</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for Chart */}
              <div className="h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                Sales Chart Here
              </div>
            </CardContent>
          </Card>

          {/* Available Products */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Available Products</CardTitle>
                <Link href="#" className="text-sm text-primary">See All Product</Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Product 1 */}
                <div className="flex items-center space-x-4">
                  <img src="https://i.pravatar.cc/50?img=1" alt="Product" className="w-12 h-12 rounded-md"/>
                  <div>
                    <div className="text-sm font-semibold">Red Tape Sports Shoes for Men</div>
                    <div className="text-xs text-green-500">Available</div>
                    <div className="text-xs text-gray-500">135 Stocks Remaining</div>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="flex items-center space-x-4">
                  <img src="https://i.pravatar.cc/50?img=2" alt="Product" className="w-12 h-12 rounded-md"/>
                  <div>
                    <div className="text-sm font-semibold">Fastrack FS1 Pro Smartwatch</div>
                    <div className="text-xs text-green-500">Available</div>
                    <div className="text-xs text-gray-500">76 Stocks Remaining</div>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="flex items-center space-x-4">
                  <img src="https://i.pravatar.cc/50?img=3" alt="Product" className="w-12 h-12 rounded-md"/>
                  <div>
                    <div className="text-sm font-semibold">Leriya Fashion Men's Shirt</div>
                    <div className="text-xs text-green-500">Available</div>
                    <div className="text-xs text-gray-500">865 Stocks Remaining</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Latest Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Orders</CardTitle>
          </CardHeader>
          <CardContent className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>#9876XC</TableCell>
                  <TableCell>Allen Solly</TableCell>
                  <TableCell>Sep 20, 09:08 am</TableCell>
                  <TableCell>₱441.00</TableCell>
                  <TableCell>Transfer</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell className="text-right">
                    <Link href="#" className="text-primary">View</Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#9876XD</TableCell>
                  <TableCell>Louis Phillipe</TableCell>
                  <TableCell>Sep 21, 10:00 am</TableCell>
                  <TableCell>₱500.00</TableCell>
                  <TableCell>COD</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell className="text-right">
                    <Link href="#" className="text-primary">View</Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboardPage;

