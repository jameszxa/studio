
'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Icons} from '@/components/icons';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Could not load products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex justify-center">
        <Input
          type="text"
          placeholder="Search for products"
          className="w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="cursor-pointer" onClick={() => handleProductClick(product.id)}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={product.image} alt={product.name} className="rounded-md mb-4 w-full h-48 object-cover"/>
              <CardDescription>{product.description}</CardDescription>
              <div className="font-bold text-teal-500">${product.price.toFixed(2)}</div>
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
    </div>
  );
};

export default Home;
