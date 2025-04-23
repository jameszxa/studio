'use client';

import {useState, useEffect} from 'react';
import {useParams, useSearchParams} from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Icons} from '@/components/icons';
import React from "react";
import Link from 'next/link';
import { motion } from 'framer-motion';

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

const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const {category} = useParams<{ category: string }>();
  const [sortOrder, setSortOrder] = useState('asc');
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        // Filter products to only include those from Cagayan de Oro and matching category
        const localProducts = data.filter(product => product.location === "Cagayan de Oro" && product.category.toLowerCase() === category);
        setProducts(localProducts);
      } catch (error) {
        console.error('Could not load products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    const searchTermParam = searchParams.get('searchTerm') || '';
    setSearchTerm(searchTermParam);
  }, [searchParams]);

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = a.price;
    const priceB = b.price;
    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
  });

  const filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">Category: {category}</h1>

      <div className="mb-8 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search for products"
          className="w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
            className="border p-2 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
        >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <motion.div
              
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
             <Card className="w-64">
                <CardContent className="flex flex-col p-4">
                  <img
                    src={product.image}
                      alt={product.name}
                    className="rounded-md mb-4 w-full h-64 object-cover"
                  />
                  <div className="font-bold text-sm">{product.name}</div>
                  <div className="font-bold text-primary mt-2">PHP {product.price.toFixed(2)}</div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
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
    </div>
  );
};

export default CategoryPage;
