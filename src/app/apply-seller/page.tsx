'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import {useEffect, useState} from 'react';

const ApplySellerPage = () => {
  const [storeName, setStoreName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [legalBusinessName, setLegalBusinessName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setStateValue] = useState('');
  const [locationOnMap, setLocationOnMap] = useState('');
  const [productPerPage, setProductPerPage] = useState('25');
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [storeVisibility, setStoreVisibility] = useState('public');
  const [storeCategories, setStoreCategories] = useState('');

  useEffect(() => {
    // You can load data from localStorage or a similar state management solution here
  }, []);

  const handleSave = () => {
    // Store the settings in localStorage or a similar state management solution

    console.log('Seller application details:', {
      storeName,
      emailAddress,
      phoneNumber,
      legalBusinessName,
      addressLine1,
      addressLine2,
      city,
      postcode,
      country,
      state,
      locationOnMap,
      productPerPage,
      termsAndConditions,
      storeVisibility,
      storeCategories,
    });
    alert('Seller application details saved!');
  };

  const handleApplyNow = () => {
    // Logic to submit the application
    alert('Application submitted!');
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Apply as a Seller!</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="store-information">Store Details</Label>
            <Card className="shadow-none border-2 border-gray-200">
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://picsum.photos/100/100" alt="Store Profile"/>
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Store Profile</CardTitle>
                    <p className="text-sm text-muted-foreground">Update your store profile photos and settings</p>
                  </div>
                </div>
                <div className="grid gap-4 mt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input type="text" id="storeName" placeholder="mystore" value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="emailAddress">Email Address</Label>
                    <Input type="email" id="emailAddress" placeholder="contact@mystore.com" value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input type="tel" id="phoneNumber" placeholder="(123) 456-7890" value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}/>
                  </div>
                  <Button size="sm" onClick={handleSave}>Save</Button>
                </div>
                <div className="mt-4">
                  <Label htmlFor="store-profile-photo">Store profile photo</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="https://picsum.photos/50/50" alt="Store Profile Photo"/>
                      <AvatarFallback>SPP</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">Delete</Button>
                    <Button size="sm">Update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="store-address">Store Address</Label>
            <Card className="shadow-none border-2 border-gray-200">
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="legalBusinessName">Legal Business Name</Label>
                  <Input type="text" id="legalBusinessName" placeholder="CDO Enterprises"
                    value={legalBusinessName} onChange={(e) => setLegalBusinessName(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input type="text" id="addressLine1" placeholder="Purok 1, Brgy. Patag"
                    value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input type="text" id="addressLine2" placeholder="Optional: Building Name, Floor"
                    value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input type="text" id="city" placeholder="Cagayan de Oro" value={city}
                    onChange={(e) => setCity(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="postcode">Postcode / ZIP</Label>
                  <Input type="text" id="postcode" placeholder="9000" value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input type="text" id="country" placeholder="Philippines" value={country}
                    onChange={(e) => setCountry(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">Province</Label>
                  <Input type="text" id="state" placeholder="Misamis Oriental" value={state}
                    onChange={(e) => setStateValue(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="locationOnMap">Locate on Map</Label>
                  <Input type="text" id="locationOnMap" placeholder="Patag, Cagayan de Oro, Philippines"
                    value={locationOnMap} onChange={(e) => setLocationOnMap(e.target.value)}/>
                </div>
                <Button size="sm" onClick={handleSave}>Save</Button>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="store-display">Store Display</Label>
            <Card className="shadow-none border-2 border-gray-200">
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="productPerPage">Product per page</Label>
                  <Input type="number" id="productPerPage" placeholder="25" value={productPerPage}
                    onChange={(e) => setProductPerPage(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="termsAndConditions">Terms &amp; conditions</Label>
                  <Textarea id="termsAndConditions" placeholder="Details" value={termsAndConditions}
                    onChange={(e) => setTermsAndConditions(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="storeVisibility">Store visibility</Label>
                  <Input type="text" id="storeVisibility" placeholder="Public" value={storeVisibility}
                    onChange={(e) => setStoreVisibility(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="storeCategories">Store categories</Label>
                  <Input type="text" id="storeCategories" placeholder="categories" value={storeCategories}
                    onChange={(e) => setStoreCategories(e.target.value)}/>
                </div>
                <Button size="sm" onClick={handleSave}>Save</Button>
              </CardContent>
            </Card>
          </div>
          <Button onClick={handleApplyNow}>Apply Now!</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplySellerPage;
