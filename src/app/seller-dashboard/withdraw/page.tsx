'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Wallet,
  Clock,
  Settings,
  ExternalLink,
} from 'lucide-react';

const WithdrawPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side: Balance and Withdrawal Options */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">₱0.00</div>
              <Button className="mt-4">Withdraw</Button>
              <div className="mt-4 text-sm">
                Minimum Balance: ₱1000.00
              </div>
              <div className="text-sm">
                Account Payable: JohnDoe123@gmail.com
              </div>
              <div className="text-sm">
                Withdraw Schedule: Once a month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">₱0.00</div>
              <div className="text-sm">
                JohnDoe123@gmail.com (account payable) <a href="#" className="text-blue-500">change</a>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Withdrawals</CardTitle>
            </CardHeader>
            <CardContent>
              No recent withdrawals
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Upcoming Withdrawals</CardTitle>
            </CardHeader>
            <CardContent>
              No upcoming withdrawals
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Pending Withdrawals</CardTitle>
            </CardHeader>
            <CardContent>
              You have no pending withdrawal request. No withdrawal(scheduled/requested) shall be processed if you have any request pending.
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Balance Chart and Options */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Balance</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder Chart */}
              <div className="h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                Balance Chart Here
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Transactions History</span>
                </div>
                <a href="#" className="text-blue-500">View more</a>
              </div>
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Withdraw Settings</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default WithdrawPage;

