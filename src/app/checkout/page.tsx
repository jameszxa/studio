'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
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
    const [isGuest, setIsGuest] = useState(false);
    const [shippingDetails, setShippingDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: ''
    });

    // Simplified effect to load cart items ONCE on mount
    useEffect(() => {
        console.log("Checkout: Attempting to load cart items from local storage...");
        const storedCartItems = localStorage.getItem('cartItems');

        if (storedCartItems) {
            try {
                const parsedCartItems = JSON.parse(storedCartItems);
                console.log("Checkout: Raw data from local storage:", storedCartItems);
                console.log("Checkout: Parsed cart items:", parsedCartItems);

                if (Array.isArray(parsedCartItems)) {
                    setCartItems(parsedCartItems);
                    // Initialize quantities based on the loaded cart items
                    const initialQuantities: { [key: string]: number } = {};
                    parsedCartItems.forEach((item: CartItem) => {
                        initialQuantities[item.id] = item.quantity || 1;
                    });
                    setQuantities(initialQuantities);

                } else {
                    console.error("Checkout: Stored cart items is not an array:", parsedCartItems);
                    setCartItems([]);
                    setQuantities({});
                }
            } catch (error) {
                console.error("Checkout: Error parsing cart items from local storage:", error);
                setCartItems([]);
                setQuantities({});
            }
        } else {
            console.log("Checkout: No cart items found in local storage.");
            setCartItems([]);
            setQuantities({});
        }
    }, []);

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        if (newQuantity >= 1) {
            const updatedQuantities = {
                ...quantities,
                [itemId]: newQuantity,
            };
            setQuantities(updatedQuantities);

            const updatedCartItems = cartItems.map(item => {
                if (item.id === itemId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            window.dispatchEvent(new Event('cartUpdated'));
        }
    };

    const handleApplyCoupon = () => {
        if (couponCode === 'DISCOUNT10') {
            setDiscount(0.1);
        } else {
            setDiscount(0);
            alert('Invalid coupon code.');
        }
    };

    const handleRemoveItem = (itemId: string) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);

        const updatedQuantities = { ...quantities };
        delete updatedQuantities[itemId];
        setQuantities(updatedQuantities);

        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const subtotal = calculateSubtotal();
    const shippingFee = 50;
    const total = subtotal * (1 - discount) + shippingFee;

    const handleProceedToCheckout = () => {
        // Clear the cart only AFTER successful checkout (e.g., on order confirmation page)
        // localStorage.removeItem('cartItems');
        // localStorage.removeItem('quantities'); // Remove this if quantities state is removed

        // TODO: Add actual checkout logic here (e.g., send data to backend, payment processing)

        // Redirect to a confirmation page
        router.push('/order-confirmation');
    };

    const handleGuestCheckout = () => {
        setIsGuest(true);
    };

    const handleShippingDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingDetails({ ...shippingDetails, [e.target.id]: e.target.value });
    };

    console.log("Checkout: Rendering with cartItems:", cartItems);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            {/* Checkout Progress */}
            <div className="mb-4">
                <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                    <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:inline-block after:mx-6 xl:mx-8 dark:after:border-gray-700">
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-700">
                            <span className="me-2">Cart</span>
                            <svg className="hidden w-3 h-3 text-blue-600 sm:inline-flex shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                        </span>
                    </li>
                    <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:inline-block after:mx-6 xl:mx-8 dark:after:border-gray-700">
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-700">
                            <span className="me-2">Shipping</span>
                            <svg className="w-3 h-3 ms-2 sm:inline-flex shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                        </span>
                    </li>
                    <li className="flex items-center">
                        <span className="me-2">Review</span>
                    </li>
                </ol>
            </div>

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
                                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-2" />
                                                            <span>{item.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">PHP {item.price.toFixed(2)}</td>
                                                    <td className="px-4 py-2">
                                                        <Input
                                                            type="number"
                                                            className="w-20 text-center"
                                                            value={quantities[item.id] || item.quantity}
                                                            onChange={(e) => {
                                                                const newQuantity = parseInt(e.target.value);
                                                                if (!isNaN(newQuantity)) {
                                                                    handleQuantityChange(item.id, Math.max(1, newQuantity));
                                                                }
                                                            }}
                                                            min="1"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">PHP {(item.price * (quantities[item.id] || item.quantity)).toFixed(2)}</td>
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

                                {/* Guest Checkout Form */}
                                {isGuest ? (
                                    <div className="mt-4 border rounded-md p-4">
                                        <h3 className="text-md font-semibold mb-2">Shipping Details</h3>
                                        <div className="grid gap-4">
                                            <div>
                                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                                <Input type="text" id="firstName" className="mt-1" onChange={handleShippingDetailsChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                                <Input type="text" id="lastName" className="mt-1" onChange={handleShippingDetailsChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                                <Input type="email" id="email" className="mt-1" onChange={handleShippingDetailsChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                                <Input type="tel" id="phoneNumber" className="mt-1" onChange={handleShippingDetailsChange} required />
                                            </div>
                                            <div>
                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                                <Input type="text" id="address" className="mt-1" onChange={handleShippingDetailsChange} required />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Button className="mt-4 w-full" onClick={handleGuestCheckout}>
                                        Checkout as Guest
                                    </Button>
                                )}

                                {/* Shipping Information */}
                                <div className="mt-4 border rounded-md p-4">
                                    <h3 className="text-md font-semibold mb-2">Shipping Information</h3>
                                    <p>Delivery within Cagayan de Oro: PHP {shippingFee.toFixed(2)}</p>
                                    <p>Estimated Delivery Time: 2-3 business days</p>
                                    <Link href="/shipping-details" className="text-primary hover:underline">
                                        View Delivery Details
                                    </Link>
                                </div>

                                <Button className="mt-4 w-full" onClick={handleProceedToCheckout} disabled={isGuest && (!shippingDetails.firstName || !shippingDetails.lastName || !shippingDetails.email || !shippingDetails.phoneNumber || !shippingDetails.address)}>
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