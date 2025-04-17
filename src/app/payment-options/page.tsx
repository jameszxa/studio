'use client';

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

const PaymentOptionsPage = () => {
  const [paymentMethods, setPaymentMethods] = React.useState([
    {
      id: '1',
      type: 'GCash',
      accountNumber: '09123456789',
    },
  ]);

  const handleAddPaymentMethod = () => {
    // Logic to add a new payment method
  };

  const handleEditPaymentMethod = (id: string) => {
    // Logic to edit an existing payment method
  };

  const handleDeletePaymentMethod = (id: string) => {
    // Logic to delete a payment method
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>My Payment Options</CardTitle>
        </CardHeader>
        <CardContent>
          {paymentMethods.map(method => (
            <div key={method.id} className="mb-4 border rounded-md p-4">
              <h3 className="text-lg font-semibold">{method.type}</h3>
              <p>GCash Account Number: {method.accountNumber}</p>
              <div className="flex justify-end mt-2">
                <Button size="sm" onClick={() => handleEditPaymentMethod(method.id)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeletePaymentMethod(method.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <Button onClick={handleAddPaymentMethod}>Add New Payment Method</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentOptionsPage;
