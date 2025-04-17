'use client';

import {useState, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Icons} from '@/components/icons';
import React from "react";

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
        "https://i.picsum.photos/id/1060/1920/1080.jpg?hmac=E4G9ikC6Yt64qtC9TrX1jwEUvXF-xwEQtB2jT-3T7FU",
        "https://i.picsum.photos/id/237/1920/1080.jpg?hmac=ExwG_JLRyK_0mKiZOUt54Dt9hG7QyBwJkW-3qUzlP6o",
        "https://i.picsum.photos/id/1047/4928/3264.jpg?hmac=kfQCjnF609wS5K-nrjoAgZfEju2c0j77jqvGCUI6w2U",
        "https://i.picsum.photos/id/105/3672/4896.jpg?hmac=WxLgV22eCjTtq_Kj10jKzx0uD9vqGeqjZw-Y-oFMgOE",
        "https://i.picsum.photos/id/1062/4147/2756.jpg?hmac=W6wK-dVw-cGuKffZ-n7R2-byt7szm979KI3WCc5V-dQ"
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
    }, []);

  return (
    <div className="container mx-auto py-10">
      {/* Welcome Banner */}
      <div className="relative w-full mb-8 rounded-md overflow-hidden shadow-md">
        <img
          src={bannerImages[currentSlide]}
          alt="Sale Event"
          className="w-full h-64 object-cover transition-opacity duration-500"
            style={{ opacity: 1 }} // Add transition for smoother effect
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-bold text-primary-foreground">Welcome to BUYong!</h2>
          <p className="text-lg text-primary-foreground">Discover amazing deals on local Filipino products.</p>
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
        <h2 className="text-2xl font-semibold mb-4">Flash Sales</h2>
        {/* Add Flash Sales component here */}
        <p>Flash sales content will be here</p>
      </section>

      {/* New Arrival Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
        {/* Add New Arrivals component here */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="cursor-pointer" onClick={() => handleProductClick(product.id)}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <img src={product.image} alt={product.name} className="rounded-md mb-4 w-full h-48 object-cover"/>
              <CardDescription>{product.description}</CardDescription>
              <div className="font-bold text-primary mt-2">PHP {product.price.toFixed(2)}</div>
            </CardContent>
          </Card>
        ))}
      </div>
          {products.length === 0 && (
          <div className="text-center mt-4">
            <Icons.loader className="h-6 w-6 animate-spin mx-auto mb-2" />
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
