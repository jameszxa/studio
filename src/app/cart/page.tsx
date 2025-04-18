// src/app/cart/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Trash } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleRemoveItem = (itemId: string) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      // Dispatch a custom event to notify other components about the cart update
    const cartUpdatedEvent = new CustomEvent('cartUpdated', { detail: { cartItems: updatedCartItems } });
    window.dispatchEvent(cartUpdatedEvent);

  };

  const calculateSubtotal = (item: CartItem) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link href="/" className="text-primary">Continue Shopping</Link></p>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Product</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Subtotal</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="[&amp;:last-child]:border-0">
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-2" />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">PHP {item.price.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-2">PHP {calculateSubtotal(item).toFixed(2)}</td>
                      <td className="px-4 py-2">
                        <Button variant="destructive" size="icon" onClick={() => handleRemoveItem(item.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <div className="font-bold">Total: PHP {calculateTotal().toFixed(2)}</div>
            </div>
            <Link href="/checkout" className="mt-4 block">
              <Button>Proceed to Checkout</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CartPage;