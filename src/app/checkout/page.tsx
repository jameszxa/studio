'use client';

import React, {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent} from '@/components/ui/card';
import {Trash} from 'lucide-react';
import {cn} from '@/lib/utils';

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

  const handleQuantityChange = (itemId: string, change: number) => {
    setQuantities(prevQuantities => {
      const currentQuantity = prevQuantities[itemId] || 1;
      const newQuantity = Math.max(1, currentQuantity + change); // Ensure quantity is not less than 1
      return {...prevQuantities, [itemId]: newQuantity};
    });
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
  const shippingFee = 0; // Free shipping
  const total = subtotal * (1 - discount) + shippingFee;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
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
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, -1)}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              className="w-16 text-center mx-2"
                              value={quantities[item.id] || 1}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value);
                                if (!isNaN(newQuantity)) {
                                  setQuantities(prevQuantities => ({
                                    ...prevQuantities,
                                    [item.id]: Math.max(1, newQuantity),
                                  }));
                                }
                              }}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, 1)}
                            >
                              +
                            </Button>
                          </div>
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
                <div className="mt-4">
                  <Input
                    type="text"
                    placeholder="Coupon Code"
                    className="w-full max-w-sm mr-2"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button onClick={handleApplyCoupon}>Apply Coupon</Button>
                </div>
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
                  <span>Free</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Discount:</span>
                  <span>- PHP {(subtotal * discount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>PHP {total.toFixed(2)}</span>
                </div>
                <Button className="mt-4 w-full">
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
