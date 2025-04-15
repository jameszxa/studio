
'use client';

import {useState, useEffect} from 'react';
import {useParams} from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {suggestSimilarProducts, SuggestSimilarProductsOutput} from '@/ai/flows/suggest-similar-products';
import {Button} from '@/components/ui/button';
import {Icons} from '@/components/icons';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<SuggestSimilarProductsOutput | null>(null);
  const {id} = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        const foundProduct = data.find(p => p.id === id) || null;
        setProduct(foundProduct);
      } catch (error) {
        console.error('Could not load product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (product) {
        try {
          const aiResponse = await suggestSimilarProducts({
            productName: product.name,
            productDescription: product.description,
            productCategory: product.category,
          });
          setSimilarProducts(aiResponse);
        } catch (error) {
          console.error('AI Recommendation Error:', error);
        }
      }
    };

    if (product) {
      fetchSimilarProducts();
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center mt-4">
          <Icons.loader className="h-6 w-6 animate-spin mx-auto mb-2" />
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={product.image} alt={product.name} className="rounded-md mb-4 w-full h-64 object-cover"/>
          <CardDescription>{product.description}</CardDescription>
          <div className="font-bold text-teal-500 mt-4">PHP {product.price.toFixed(2)}</div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Similar Products</h2>
        {similarProducts && similarProducts.similarProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.similarProducts.map((similarProduct, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{similarProduct.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{similarProduct.description}</CardDescription>
                  <p className="text-sm text-muted-foreground">
                    Relevance: {(similarProduct.relevanceScore * 100).toFixed(0)}%
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No similar products found.</p>
        )}
         {!similarProducts && (
            <div className="text-center mt-4">
              <Icons.loader className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p>Loading similar products...</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductDetailPage;


    