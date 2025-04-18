'use client';

import {useState, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Icons} from '@/components/icons';
import React from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  location: string;
  storeId: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
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
          <img src="/images/promo.jpg" alt="Promo" className="w-full h-[300px] object-cover" />
        </div>

        {/* Slide Indicators */}
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
        <Input
          type="text"
          placeholder="Search for products"
          className="w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Flash Sales Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
        <div className="flex justify-around">
            <Link href="/category/clothing">Clothing</Link>
            <Link href="/category/food">Food</Link>
            <Link href="/category/handicrafts">Handicrafts</Link>
        </div>
      </section>

      {/* New Arrival Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
        {/* Add New Arrivals component here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="cursor-pointer border shadow-sm hover:shadow-md transition-shadow" onClick={() => handleProductClick(product.id)}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <img src={product.image} alt={product.name}
                  className="rounded-md mb-4 w-full h-48 object-cover"/>
                <CardDescription>{product.description}</CardDescription>
                <div className="font-bold text-primary mt-2">PHP {product.price.toFixed(2)}</div>
              </CardContent>
            </Card>
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
    </div>
  );
};

export default Home;
