'use client';

import React, {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Search, User, ShoppingCart} from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Load cart items from local storage
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      let count = 0;
      parsedCartItems.forEach((item: any) => {
        count += item.quantity;
      });
      setCartItemCount(count);
    }

    const handleCartUpdate = () => {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        const parsedCartItems = JSON.parse(storedCartItems);
        let count = 0;
        parsedCartItems.forEach((item: any) => {
          count += item.quantity;
        });
        setCartItemCount(count);
      } else {
        setCartItemCount(0);
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/?searchTerm=${searchTerm}`);
    }
  };

  return (
    <header className="bg-primary text-black p-4 flex items-center justify-between rounded-md shadow-md">
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
          <Search className="h-5 w-5 text-black"/>
        </Button>
      </div>

      {/* Cart Icon */}
      <div className="flex items-center space-x-2 relative">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/checkout">
            <ShoppingCart className="h-6 w-6 text-black"/>
          </Link>
        </Button>
        {cartItemCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1 py-0.5">
            {cartItemCount}
          </span>
        )}

        {/* User Profile Icon */}
        <Button variant="ghost" size="icon" asChild>
          <Link href="/account-settings">
            <User className="h-6 w-6 text-black"/>
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
