'use client';

import React, {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent} from '@/components/ui/card';
import {Trash} from 'lucide-react';
import {cn} from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
    const router = useRouter();

  useEffect(() => {
    // Load cart items from local storage
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      try {
        const parsedCartItems = JSON.parse(storedCartItems);
        if (Array.isArray(parsedCartItems)) {
          setCartItems(parsedCartItems);

          // Initialize quantities based on cart items
          const initialQuantities: { [key: string]: number } = {};
          parsedCartItems.forEach((item: CartItem) => {
            initialQuantities[item.id] = item.quantity || 1; // Use stored quantity or default to 1
          });
          setQuantities(initialQuantities);
        } else {
          console.error('Stored cart items is not an array:', parsedCartItems);
          // Handle the error appropriately, e.g., clear the cart
          localStorage.removeItem('cartItems');
          setCartItems([]);
          setQuantities({});
        }
      } catch (error) {
        console.error('Error parsing cart items from local storage:', error);
        // Handle the error appropriately, e.g., clear the cart
        localStorage.removeItem('cartItems');
        setCartItems([]);
        setQuantities({});
      }
    }
  }, []);

  useEffect(() => {
    // Save cart items and quantities to local storage whenever they change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('quantities', JSON.stringify(quantities));
  }, [cartItems, quantities]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [itemId]: newQuantity,
      }));
    }
  };

  const handleApplyCoupon = () => {
    // Replace with actual coupon validation logic
    if (couponCode === 'DISCOUNT10') {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0);
      alert('Invalid coupon code.');
    }
  };

  const handleRemoveItem = (itemId: string) => {
    // Remove item from cart
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    setQuantities(prevQuantities => {
      const newQuantities = {...prevQuantities};
      delete newQuantities[itemId];
      return newQuantities;
    });
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach(item => {
      subtotal += item.price * (quantities[item.id] || 1);
    });
    return subtotal;
  };

  const subtotal = calculateSubtotal();
  const shippingFee = 50; // Philippine pesos
  const total = subtotal * (1 - discount) + shippingFee;

    const handleProceedToCheckout = () => {
        // Clear the cart
        localStorage.removeItem('cartItems');
        localStorage.removeItem('quantities');

        // Redirect to a confirmation page
        router.push('/order-confirmation');
    };


  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link href="/" className="text-primary">Return to Shop</Link></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2">
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
                    {cartItems.map(item => (
                      <tr key={item.id} className="[&amp;:last-child]:border-0">
                        <td className="px-4 py-2">
                          <div className="flex items-center">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-2"/>
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2">PHP {item.price.toFixed(2)}</td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            className="w-20 text-center"
                            value={quantities[item.id] || 1}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value);
                              if (!isNaN(newQuantity)) {
                                handleQuantityChange(item.id, Math.max(1, newQuantity));
                              }
                            }}
                          />
                        </td>
                        <td className="px-4 py-2">PHP {(item.price * (quantities[item.id] || 1)).toFixed(2)}</td>
                        <td className="px-4 py-2">
                          <Button variant="destructive" size="icon" onClick={() => handleRemoveItem(item.id)}>
                            <Trash className="h-4 w-4"/>
                          </Button>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex items-center">
                  <Input
                    type="text"
                    placeholder="Coupon Code"
                    className="w-full max-w-sm mr-2"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button onClick={handleApplyCoupon}>Apply Coupon</Button>
                </div>
                <Link href="/" className="mt-4 text-primary">Return to Shop</Link>
              </CardContent>
            </Card>
          </div>

          {/* Cart Total */}
          <div>
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Cart Total</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>PHP {subtotal.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between mb-2">
                    <span>Shipping:</span>
                    <span>PHP {shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Discount:</span>
                  <span>- PHP {(subtotal * discount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>PHP {total.toFixed(2)}</span>
                </div>
                  {/* Shipping Information */}
                  <div className="mt-4 border rounded-md p-4">
                      <h3 className="text-md font-semibold mb-2">Shipping Information</h3>
                      <p>Delivery within Cagayan de Oro: PHP {shippingFee.toFixed(2)}</p>
                      <p>Estimated Delivery Time: 2-3 business days</p>
                      <Link href="/shipping-details" className="text-primary hover:underline">
                          View Delivery Details
                      </Link>
                  </div>
                <Button className="mt-4 w-full" onClick={handleProceedToCheckout}>
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
