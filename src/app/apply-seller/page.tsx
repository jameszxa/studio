'use client';

import React, {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {useEffect, useState} from 'react';
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  storeName: z.string().min(2, {message: "Store name must be at least 2 characters."}),
  emailAddress: z.string().email({message: "Please enter a valid email address."}),
  phoneNumber: z.string().min(7, {message: "Please enter a valid phone number."}),
  legalBusinessName: z.string().min(2, {message: "Legal business name must be at least 2 characters."}),
  addressLine1: z.string().min(2, {message: "Address line 1 must be at least 2 characters."}),
  addressLine2: z.string().optional(),
  city: z.string().min(2, {message: "City must be at least 2 characters."}),
  postcode: z.string().min(4, {message: "Postcode must be at least 4 characters."}),
  country: z.string().min(2, {message: "Country must be at least 2 characters."}),
  state: z.string().min(2, {message: "Province must be at least 2 characters."}),
  locationOnMap: z.string().min(2, {message: "Location on map must be at least 2 characters."}),
  termsAndConditions: z.string().min(10, {message: "Terms & conditions must be at least 10 characters."}),
  storeVisibility: z.enum(['public', 'private']),
  storeCategories: z.string().min(2, {message: "Store categories must be at least 2 characters."}),
});

type FormValues = z.infer<typeof formSchema>;

const ApplySellerPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: '',
      emailAddress: '',
      phoneNumber: '',
      legalBusinessName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      postcode: '',
      country: '',
      state: '',
      locationOnMap: '',
      termsAndConditions: '',
      storeVisibility: 'public',
      storeCategories: '',
    },
  });

  const storeName = watch("storeName");
  const emailAddress = watch("emailAddress");
  const phoneNumber = watch("phoneNumber");
  const legalBusinessName = watch("legalBusinessName");
  const addressLine1 = watch("addressLine1");
  const addressLine2 = watch("addressLine2");
  const city = watch("city");
  const postcode = watch("postcode");
  const country = watch("country");
  const state = watch("state");
  const locationOnMap = watch("locationOnMap");
  const termsAndConditions = watch("termsAndConditions");
  const storeVisibility = watch("storeVisibility");
  const storeCategories = watch("storeCategories");
    const router = useRouter();

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
      termsAndConditions,
      storeVisibility,
      storeCategories,
    });
    alert('Seller application details saved!');
  };

  const onSubmit = (data: FormValues) => {
    // Logic to submit the application
    console.log('Application submitted!', data);
    alert('Application submitted!');
        router.push('/seller-dashboard'); // Redirect to seller dashboard after submission
  };

    const mapAddress = `${addressLine1}, ${addressLine2 ? addressLine2 + ', ' : ''}${city}, ${state} ${postcode}, ${country}`;
    const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(mapAddress)}`;


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
                      <Input type="text" id="storeName" placeholder="BUYong Store"
                             {...register("storeName")}
                      />
                      {errors.storeName && (
                        <p className="text-red-500 text-sm">{errors.storeName.message}</p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="emailAddress">Email Address</Label>
                      <Input type="email" id="emailAddress" placeholder="contact@buyongstore.com"
                             {...register("emailAddress")}
                      />
                      {errors.emailAddress && (
                        <p className="text-red-500 text-sm">{errors.emailAddress.message}</p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input type="tel" id="phoneNumber" placeholder="(088) 123-4567"
                             {...register("phoneNumber")}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                      )}
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
                           {...register("legalBusinessName")}
                    />
                    {errors.legalBusinessName && (
                      <p className="text-red-500 text-sm">{errors.legalBusinessName.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input type="text" id="addressLine1" placeholder="Purok 1, Brgy. Patag"
                           {...register("addressLine1")}
                    />
                    {errors.addressLine1 && (
                      <p className="text-red-500 text-sm">{errors.addressLine1.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input type="text" id="addressLine2" placeholder="Optional: Building Name, Floor"
                           {...register("addressLine2")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input type="text" id="city" placeholder="Cagayan de Oro"
                           {...register("city")}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="postcode">Postcode / ZIP</Label>
                    <Input type="text" id="postcode" placeholder="9000"
                           {...register("postcode")}
                    />
                    {errors.postcode && (
                      <p className="text-red-500 text-sm">{errors.postcode.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input type="text" id="country" placeholder="Philippines"
                           {...register("country")}
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm">{errors.country.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">Province</Label>
                    <Input type="text" id="state" placeholder="Misamis Oriental"
                           {...register("state")}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm">{errors.state.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="locationOnMap">Locate on Map</Label>
                    <Input type="text" id="locationOnMap" placeholder="Patag, Cagayan de Oro, Philippines"
                           {...register("locationOnMap")}
                    />
                    {errors.locationOnMap && (
                      <p className="text-red-500 text-sm">{errors.locationOnMap.message}</p>
                    )}
                  </div>
                                  {/* Google Maps Embed */}
                                  <div className="mt-4">
                                      <iframe
                                          width="100%"
                                          height="300"
                                          style={{ border: 0 }}
                                          loading="lazy"
                                          allowFullScreen
                                          src={mapEmbedUrl}
                                      ></iframe>
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
                    <Label htmlFor="termsAndConditions">Terms &amp; conditions</Label>
                    <Textarea id="termsAndConditions" placeholder="Details"
                              {...register("termsAndConditions")}
                    />
                    {errors.termsAndConditions && (
                      <p className="text-red-500 text-sm">{errors.termsAndConditions.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="storeVisibility">Store visibility</Label>
                    <RadioGroup defaultValue="public" className="flex"
                                {...register("storeVisibility")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="r1"/>
                        <Label htmlFor="r1">Public</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="r2"/>
                        <Label htmlFor="r2">Private</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="storeCategories">Store categories</Label>
                    <Input type="text" id="storeCategories" placeholder="categories"
                           {...register("storeCategories")}
                    />
                    {errors.storeCategories && (
                      <p className="text-red-500 text-sm">{errors.storeCategories.message}</p>
                    )}
                  </div>
                  <Button size="sm" onClick={handleSave}>Save</Button>
                </CardContent>
              </Card>
            </div>
            <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>Apply Now!</Button>
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
