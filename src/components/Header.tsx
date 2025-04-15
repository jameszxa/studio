'use client';

import React from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Search, User} from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between rounded-md shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img src="https://placehold.co/40x40" alt="BUYong Logo" className="mr-2 rounded-full"/>
        <span className="text-2xl font-bold">BUYong</span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Contact</a>
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Sign Up</a>
      </nav>

      {/* Search Bar */}
      <div className="flex items-center">
        <Input type="text" placeholder="Search products" className="mr-2 rounded-full"/>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5"/>
        </Button>
      </div>

      {/* User Profile Icon */}
      <Button variant="ghost" size="icon">
        <User className="h-6 w-6"/>
      </Button>
    </header>
  );
};

export default Header;
