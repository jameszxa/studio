'use client';

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

const AddressBookPage = () => {
  const [addresses, setAddresses] = React.useState([
    {
      id: '1',
      name: 'Home',
      addressLine1: 'Purok 1, Brgy. Patag',
      addressLine2: 'Cagayan de Oro',
      city: 'Cagayan de Oro',
      province: 'Misamis Oriental',
      country: 'Philippines',
      postalCode: '9000',
    },
  ]);

  const handleAddAddress = () => {
    // Logic to add a new address
  };

  const handleEditAddress = (id: string) => {
    // Logic to edit an existing address
  };

  const handleDeleteAddress = (id: string) => {
    // Logic to delete an address
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Address Book</CardTitle>
        </CardHeader>
        <CardContent>
          {addresses.map(address => (
            <div key={address.id} className="mb-4 border rounded-md p-4">
              <h3 className="text-lg font-semibold">{address.name}</h3>
              <p>{address.addressLine1}</p>
              <p>{address.addressLine2}</p>
              <p>
                {address.city}, {address.province} {address.postalCode}
              </p>
              <p>{address.country}</p>
              <div className="flex justify-end mt-2">
                <Button size="sm" onClick={() => handleEditAddress(address.id)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <Button onClick={handleAddAddress}>Add New Address</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressBookPage;

