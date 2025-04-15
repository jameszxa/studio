'use client';

import {useState, useEffect} from 'react';
import {useParams} from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ShoppingCart, Star} from 'lucide-react';
import {Icons} from '@/components/icons';
import Link from 'next/link';

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

interface Store {
  id: string;
  name: string;
  image: string;
}

const StorePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const {id} = useParams<{ id: string }>();
   const [store, setStore] = useState<Store>({
    id: "1",
    name: "Aling Nena's Store",
    image: "https://i.picsum.photos/id/1027/800/600.jpg?hmac=unTLxR47WKMzK-U11fPw3mMsJOJ0VjKy1WJgsCPiucg",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        // Filter products to only include those from Cagayan de Oro and matching storeId
        const localProducts = data.filter(product => product.location === "Cagayan de Oro" && product.storeId === id);
        setProducts(localProducts);
      } catch (error) {
        console.error('Could not load products:', error);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="container mx-auto py-10">
      {/* Store Banner */}
      <div className="relative w-full mb-8 rounded-md overflow-hidden shadow-md">
        <img
          src="https://i.picsum.photos/id/1060/1920/1080.jpg?hmac=E4G9ikC6Yt64qtC9TrX1jwEUvXF-xwEQtB2jT-3T7FU" // Replace with your sale banner image
          alt="Store Banner"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-bold">Welcome to {store.name}!</h2>
          <p className="text-lg">Discover amazing products from this local Filipino store.</p>
        </div>
      </div>

      {/* Store Information */}
      <div className="flex items-center mb-8">
        <img
          src={store.image}
          alt={store.name}
          className="rounded-full w-32 h-32 object-cover mr-4"
        />
        <div>
          <h2 className="text-2xl font-semibold">{store.name}</h2>
          <p className="text-muted-foreground">Selling local Filipino products from Cagayan de Oro</p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Card key={product.id} className="cursor-pointer">
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
    </div>
  );
};

export default StorePage;
