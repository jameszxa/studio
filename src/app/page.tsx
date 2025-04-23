'use client';

import { useState, useEffect } from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from "@/components/ui/badge";
import {Icons} from '@/components/icons';
import React from "react";
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  location: string;
  storeId: string;
  discountPercentage?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPromoPopup, setShowPromoPopup] = useState(false);


  const bannerImages = [
    "/images/banner.gif",
    "/images/banner2.gif",
    "/images/banner3.gif",
    "/images/banner4.gif",
    "/images/banner5.gif",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        // Filter products to only include those from Cagayan de Oro
        const localProducts = data.filter(product => product.location === "Cagayan de Oro");
        setProducts(localProducts);
      } catch (error) {
        console.error('Could not load products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const searchTermParam = searchParams.get('searchTerm') || '';
    setSearchTerm(searchTermParam);
  }, [searchParams]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (id: string) => {
    router.push(`/product/${id}?searchTerm=${searchTerm}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromoPopup(true);
    }, 3000); // Show after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
      <div className="container mx-auto py-10">
        {/* Welcome Banner */}
        <div className="relative w-full mb-8 flex overflow-hidden shadow-md max-w-[1200px] mx-auto ">
          <div className="w-[80%] relative">
            <img
              src={bannerImages[currentSlide]}
              
              alt="Sale Event"
              className="w-full h-[300px] object-cover transition-opacity duration-500"
            />
          </div>
          <div className="w-[20%] ">
             <motion.img
                src="/images/promo.jpg"
                alt="Promo"
                className="w-full h-[300px] object-cover"
              />
          </div>
          <div className="absolute bottom-4 left-[8%]  flex justify-center space-x-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <motion.div
          whileFocus={{ borderColor: "#0070f3", boxShadow: "0 0 0 2px rgba(0, 112, 243, 0.2)" }} className="w-full max-w-md rounded-md border">
              <Input
                type="text"
                placeholder="Search for products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </motion.div>
        </div>

        {/* Flash Sales Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
          <div className="flex justify-around" >
            <motion.div whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }} className="px-4 py-2 rounded-md" >
              <Link href="/category/clothing">Clothing</Link>
            </motion.div>
            <motion.div whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }} className="px-4 py-2 rounded-md" >
              <Link href="/category/food">Food</Link>
            </motion.div>
            <motion.div whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }} className="px-4 py-2 rounded-md" >
                <Link href="/category/handicrafts">Handicrafts</Link>
            </motion.div>
          </div>
        </section>

        {/* New Arrival Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
          {/* Add New Arrivals component here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-stretch">
            {filteredProducts.map(product => (
              <div key={product.id} className="-mx-2">
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card  className="cursor-pointer hover:border hover:shadow-md transition-shadow border-none shadow-none" onClick={() => handleProductClick(product.id)} >
                    <div className="relative">
                      {product.discountPercentage && (
                        <Badge className="absolute top-2 left-2 bg-orange-500 text-white z-10">
                          -{product.discountPercentage}%
                        </Badge>
                      )}
                      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                    </div>
                    <CardContent className="p-2 flex flex-col justify-between" >
                      <div className="text-sm font-semibold mb-2">{product.name}</div>
                      <div className="flex items-center space-x-2">
                        {product.discountPercentage && product.originalPrice && (
                          <>
                            <div className="text-primary font-bold">₱{product.price.toFixed(0)}</div>
                            <div className="text-gray-500 line-through text-sm">₱{product.originalPrice.toFixed(0)}</div>
                          </>
                        )}
                        {!product.discountPercentage && (
                          <div className="text-primary font-bold">₱{product.price.toFixed(0)}</div>
                        )}
                      </div>
                      {product.rating && product.reviewCount && (
                        <div className="flex items-center mt-2">
                          <Icons.star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-gray-600 text-sm ml-1">
                            {product.rating.toFixed(1)} ({product.reviewCount})
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
          {products.length === 0 && ( 
            <div className="text-center mt-4">
              <Icons.loader className="h-6 w-6 animate-spin mx-auto mb-2"/>
              <p>Loading products...</p>
            </div>
          )}

          {filteredProducts.length === 0 && products.length > 0 && (
            <div className="text-center mt-4">
              <p>No products found matching your search.</p>
            </div>
          )}
        </section>

        {showPromoPopup && (
          <AnimatePresence>
          <motion.div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
            <button
                onClick={() => setShowPromoPopup(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              > <Icons.close className="h-5 w-5" />
            </button>
            <div className="w-64 h-80">
              <img
                  src="/images/promo.jpg"
                  alt="Promo"
                  className="w-full h-full object-cover rounded-md shadow-lg"
                />
              </div>
            </motion.div>
            </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default Home;
