'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import {useEffect, useState} from 'react';
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"

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
    <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Input Section */}
      <div className="col-span-1">
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
                      <p className="text-sm text-muted-foreground">Update your store profile photos and
                        settings</p>
                    </div>
                  </div>
                  <div className="grid gap-4 mt-4">
                    <div className="grid gap-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input type="text" id="storeName" placeholder="BUYong Store" value={storeName}
                             onChange={(e) => setStoreName(e.target.value)}/>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="emailAddress">Email Address</Label>
                      <Input type="email" id="emailAddress" placeholder="contact@buyongstore.com"
                             value={emailAddress}
                             onChange={(e) => setEmailAddress(e.target.value)}/>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input type="tel" id="phoneNumber" placeholder="(088) 123-4567" value={phoneNumber}
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
                    <Input type="text" id="legalBusinessName" placeholder="BUYong Enterprises"
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
                    <RadioGroup defaultValue="public" className="flex">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="r1" onClick={() => setStoreVisibility('public')}/>
                        <Label htmlFor="r1">Public</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="r2" onClick={() => setStoreVisibility('private')}/>
                        <Label htmlFor="r2">Private</Label>
                      </div>
                    </RadioGroup>
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

      {/* Preview Section */}
      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Store Preview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="relative w-full mb-4 rounded-md overflow-hidden">
                <img
                  src="https://i.picsum.photos/id/1060/1920/1080.jpg?hmac=E4G9ikC6Yt64qtC9TrX1jwEUvXF-xwEQtB2jT-3T7FU" // Replace with your sale banner image
                  alt="Store Banner"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://picsum.photos/100/100" alt="Store Profile"/>
                <AvatarFallback>SP</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{storeName || "Store Name"}</CardTitle>
                <p className="text-sm text-muted-foreground">{emailAddress || "contact@store.com"}</p>
                <p className="text-sm text-muted-foreground">{phoneNumber || "(088) 123-4567"}</p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Address</Label>
              <p>{legalBusinessName || "Business Name"}</p>
              <p>{addressLine1 || "Address Line 1"}</p>
              <p>{addressLine2 || "Address Line 2"}</p>
              <p>{city || "City"}, {state || "Province"} {postcode || "Postcode"}, {country || "Country"}</p>
              <p>Location on Map: {locationOnMap || "Not specified"}</p>
            </div>

            <div className="grid gap-2">
              <Label>Store Display Settings</Label>
              <p>Products per page: {productPerPage || "25"}</p>
              <p>Terms &amp; Conditions: {termsAndConditions || "Not specified"}</p>
              <p>Visibility: {storeVisibility === 'public' ? 'Public' : 'Private'}</p>
              <p>Categories: {storeCategories || 'Uncategorized'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplySellerPage;
