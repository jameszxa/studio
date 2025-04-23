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
  description: string;
}

const StorePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const {id} = useParams<{ id: string }>();
  const [store, setStore] = useState<Store>({
    id: "1",
    name: "Aling Nena's Store",
    image: "https://i.picsum.photos/id/1027/800/600.jpg?hmac=unTLxR47WKMzK-U11fPw3mMsJOJ0VjKy1WJgsCPiucg",
      description: "Aling Nena's Store is a local shop in Cagayan de Oro known for its wide variety of Filipino delicacies and handicrafts."
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
    <div className="bg-background text-foreground">
      {/* Banner Image */}
      <div className="relative">
        <img
          src="https://i.picsum.photos/id/866/1920/400.jpg?hmac=CpIJnqz3L5dt8gyZ2c6R63CmWHW4e0_Rz1m-nL9pWwU"
          alt="Store Banner"
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Store Info */}
      <div className="relative bg-white shadow-md rounded-md -mt-12 mx-4 p-4 flex items-center space-x-4">
        <img
          src="https://i.pravatar.cc/150?img=1"
          alt="Store Profile"
          className="w-24 h-24 rounded-full border-2 border-primary"
        />
        <div>
          <h2 className="text-2xl font-semibold">{store.name}</h2>
            <p className="text-gray-500">{store.description}</p>
        </div>
      </div>

      {/* Product Listing */}
      <div className="mx-4 mt-4">
        <h3 className="text-xl font-semibold mb-2">All Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(product => (
            <Card key={product.id} className="shadow-md">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                {/* Sale Label */}
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">-30%</div>
              </div>
              <CardContent className="p-2">
                <CardTitle className="text-sm font-semibold">{product.name}</CardTitle>
                <CardDescription className="text-gray-500 text-xs">PHP {product.price.toFixed(2)}</CardDescription>
                <Button size="sm" className="w-full mt-2">Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
