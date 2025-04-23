"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { cn } from "@/lib/utils";

const AccountSettingsPage = () => {
  const router = useRouter();
  const [profileName, setProfileName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

  React.useEffect(() => {
    // Retrieve user data from localStorage or a similar state management solution
    const storedFirstName = localStorage.getItem('firstName') || '';
    const storedLastName = localStorage.getItem('lastName') || '';
    const storedEmail = localStorage.getItem('email') || '';
    const storedPhoneNumber = localStorage.getItem('phoneNumber') || '';
    const storedAddress = localStorage.getItem('address') || '';

    // Update the state with the retrieved values
    setFirstName(storedFirstName);
    setLastName(storedLastName);
    setEmail(storedEmail);
    setPhoneNumber(storedPhoneNumber);
    setAddress(storedAddress);
  }, []);

  const handleSettingsUpdate = () => {
    // Store the settings in localStorage or a similar state management solution
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('address', address);

    console.log('Settings updated:', {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    });
    alert('Settings updated!');
    router.push('/'); // Redirect to homepage after settings are "updated"
  };

  const handleLogout = () => {
    // Clear all stored data from localStorage
    localStorage.clear();

    // Redirect the user to the sign-in page
    router.push('/auth/sign-in');
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-1/4 pr-8">
          <Card>
            <CardHeader>
              <CardTitle>Manage My Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/address-book" className="block hover:underline">My Profile</Link>
              <Link href="/address-book" className="block hover:underline">Address Book</Link>
              <Link href="/payment-options" className="block hover:underline">My Payment Options</Link>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>My Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/my-orders" className="block hover:underline">My Orders</Link>
              <Link href="/my-returns" className="block hover:underline">My Returns</Link>
              <Link href="#" className="block hover:underline">My Cancellations</Link>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>My Wishlist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="#" className="block hover:underline">View Wishlist</Link>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Apply As a Seller!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/apply-seller" className="block hover:underline" style={{ color: '#FFAD33' }}>
                Apply Now!
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Edit Your Profile Section */}
        <div className="w-3/4">
          <Card>
            <CardHeader>
              <CardTitle>Edit Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="grid gap-2">
                  <label htmlFor="firstName" className="text-sm font-medium leading-none">
                    First Name
                  </label>
                  <Input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </div>

                {/* Last Name */}
                <div className="grid gap-2">
                  <label htmlFor="lastName" className="text-sm font-medium leading-none">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              {/* Phone Number */}
              <div className="grid gap-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium leading-none">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  placeholder="+63 912 345 6789"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>

              {/* Address */}
              <div className="grid gap-2">
                <label htmlFor="address" className="text-sm font-medium leading-none">
                  Address
                </label>
                <Input
                  type="text"
                  id="address"
                  placeholder="Lapasan, Cagayan de Oro, 9000 Misamis Oriental"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>

              {/* Password Changes */}
              <div className="grid gap-2">
                <label htmlFor="currentPassword" className="text-sm font-medium leading-none">
                  Current Password
                </label>
                <Input
                  type="password"
                  id="currentPassword"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="newPassword" className="text-sm font-medium leading-none">
                    New Password
                  </label>
                  <Input
                    type="password"
                    id="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="confirmNewPassword" className="text-sm font-medium leading-none">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    id="confirmNewPassword"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Save Changes Button */}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
                <Button onClick={handleSettingsUpdate}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
              {/* Logout Button */}
              <Button variant="destructive" onClick={handleLogout} className="mt-4">
                Logout
              </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;

