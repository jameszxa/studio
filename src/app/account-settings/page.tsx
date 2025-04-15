'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import {Input} from '@/components/ui/input';
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from '@/components/ui/card';
import Link from 'next/link';

const AccountSettingsPage = () => {
  const router = useRouter();
  const [profileName, setProfileName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  React.useEffect(() => {
    // Retrieve user data from localStorage or a similar state management solution
    const storedProfileName = localStorage.getItem('profileName') || '';
    const storedEmail = localStorage.getItem('email') || '';
    const storedAddress = localStorage.getItem('address') || '';
    const storedPhoneNumber = localStorage.getItem('phoneNumber') || '';

    // Update the state with the retrieved values
    setProfileName(storedProfileName);
    setEmail(storedEmail);
    setAddress(storedAddress);
    setPhoneNumber(storedPhoneNumber);
  }, []);

  const handleSettingsUpdate = () => {
    // Store the settings in localStorage or a similar state management solution
    localStorage.setItem('profileName', profileName);
    localStorage.setItem('email', email);
    localStorage.setItem('address', address);
    localStorage.setItem('phoneNumber', phoneNumber);

    console.log('Settings updated:', {
      profileName,
      email,
      address,
      phoneNumber,
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
      <Card className="w-[500px] mx-auto">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Customize your account settings here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Profile Name */}
            <div className="grid gap-2">
              <label htmlFor="profileName" className="text-sm font-medium leading-none">
                Profile Name
              </label>
              <Input
                type="text"
                id="profileName"
                placeholder="Your Name"
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
              />
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

            {/* Address */}
            <div className="grid gap-2">
              <label htmlFor="address" className="text-sm font-medium leading-none">
                Address
              </label>
              <Input
                type="text"
                id="address"
                placeholder="Your Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
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
                placeholder="Your Phone Number"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Update Settings Button */}
            <Button onClick={handleSettingsUpdate}>Update Settings</Button>
            <div className="mt-4">
              <Link href="/apply-seller" className="text-sm text-primary hover:underline">
                Apply as a Seller!
              </Link>
            </div>

            {/* Logout Button */}
            <Button variant="destructive" onClick={handleLogout} className="mt-4">
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettingsPage;
