'use client';

import React from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Search, User} from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/?searchTerm=${searchTerm}`);
    }
  };

  return (
    <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between rounded-md shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <img src="/buyong_logo.png" alt="BUYong Logo" className="mr-2 rounded-full w-10 h-10 cursor-pointer"/>
        </Link>
        <Link href="/" className="text-2xl font-bold">
          BUYong
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="hover:underline text-black">
          Home
        </Link>
        <Link href="/contact" className="hover:underline text-black">
          Contact
        </Link>
        <Link href="/about" className="hover:underline text-black">
          About
        </Link>
        <Link href="/auth" className="hover:underline text-black">
          Sign Up
        </Link>
      </nav>

      {/* Search Bar */}
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Search products"
          className="mr-2 rounded-full"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Button variant="ghost" size="icon" onClick={handleSearch}>
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
