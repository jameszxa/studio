'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';

const ContactPage = () => {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Have questions or feedback? Reach out to us using the form below.
          </CardDescription>
          <div className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <label htmlFor="name">Your Name</label>
              <Input type="text" id="name" placeholder="John Doe"/>
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email Address</label>
              <Input type="email" id="email" placeholder="m@example.com"/>
            </div>
            <div className="grid gap-2">
              <label htmlFor="message">Message</label>
              <Textarea id="message" placeholder="Write your message here"/>
            </div>
            <Button>Send Message</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
