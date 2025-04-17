'use client';

import {useState, useEffect} from 'react';
import {useParams, useSearchParams} from 'next/navigation';
import {useRouter} from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {suggestSimilarProducts, SuggestSimilarProductsOutput} from '@/ai/flows/suggest-similar-products';
import {Button} from '@/components/ui/button';
import {Icons} from '@/components/icons';
import {Input} from '@/components/ui/input';
import {ShoppingCart, Star} from 'lucide-react';
import {useToast} from "@/hooks/use-toast"
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

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<SuggestSimilarProductsOutput | null>(null);
  const {id} = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm') || '';
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const {toast} = useToast()
  const [isZoomed, setIsZoomed] = useState(false);

  // Mock store data
  const [store, setStore] = useState<Store>({
    id: "1",
    name: "Aling Nena's Store",
    image: "https://i.picsum.photos/id/1027/800/600.jpg?hmac=unTLxR47WKMzK-U11fPw3mMsJOJ0VjKy1WJgsCPiucg",
    description: "Aling Nena's Store is a local shop in Cagayan de Oro known for its wide variety of Filipino delicacies and handicrafts."
  });

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
            searchTerm: searchTerm,
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
  }, [product, searchTerm]);

  const handleAddToCart = () => {
    //Basic "add to cart" logic
    if (!product) {
      console.error('No product to add to cart.');
      return;
    }
    // Retrieve existing cart items from local storage or initialize an empty array
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    // Check if the item already exists in the cart
    const existingCartItemIndex = existingCartItems.findIndex((item: any) => item.id === product?.id);

    if (existingCartItemIndex !== -1) {
      // If the item exists, update the quantity
      existingCartItems[existingCartItemIndex].quantity += quantity;
    } else {
      // If the item doesn't exist, add it to the cart with the specified quantity
      existingCartItems.push({...product, quantity: quantity});
    }

    // Store the updated cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    // Trigger a re-render of the header to update the cart count
    window.dispatchEvent(new Event('cartUpdated'));
    toast({
      title: "Success",
      description: `${quantity} of ${product?.name} added to cart!`,
    })
  };

  const handleBuyNow = () => {
    // Create a cart item
    const cartItem = {...product, quantity};

    // Store the cart item in local storage
    localStorage.setItem('cartItems', JSON.stringify([cartItem]));

    // Redirect to the checkout page with quantity as a query parameter
    router.push(`/checkout?quantity=${quantity}`);
  };


  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  if (!product) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center mt-4">
          <Icons.loader className="h-6 w-6 animate-spin mx-auto mb-2"/>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="container mx-auto py-10">

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image Carousel */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className={`rounded-md mb-4 w-full h-96 object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-150 transform-origin-center' : ''
            }`}
            style={{cursor: isZoomed ? 'zoom-out' : 'zoom-in'}}
            onClick={toggleZoom}
          />
          {/* Add more images here for a carousel effect */}
        </div>

        {/* Product Information */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                {/* Assuming a 5-star rating */}
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500"/>
                ))}
                <span className="text-muted-foreground ml-2">(150 Reviews)</span>
                <span className="text-green-500 ml-2">In Stock</span>
              </div>

              <div className="text-3xl font-bold text-primary mb-4">PHP {product.price.toFixed(2)}</div>

              <CardDescription className="mb-4">{product.description}</CardDescription>

              {/* Quantity Selection */}
              <div className="flex items-center mb-4">
                <div className="font-semibold mr-2">Quantity:</div>
                <div className="flex items-center">
                  <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)}>
                    -
                  </Button>
                  <Input
                    type="number"
                    className="w-16 text-center mx-2"
                    value={quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity)) {
                        setQuantity(Math.max(1, newQuantity));
                      }
                    }}
                  />
                  <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-2">
                <Button className="w-1/2" onClick={handleBuyNow}>
                  Buy Now
                </Button>
                <Button className="w-1/2" onClick={handleAddToCart}>
                  <ShoppingCart className="w-4 h-4 mr-2"/>
                  Add to cart
                </Button>
              </div>

              {/* Delivery and Return Information */}
              <div className="mt-6 border rounded-md p-4">
                <div className="flex items-center mb-2">
                  <Icons.delivery className="w-5 h-5 mr-2 text-muted-foreground"/>
                  <span className="font-semibold">Free Delivery</span>
                </div>
                <div className="text-sm text-muted-foreground mb-2">Enter your postal code for Delivery
                  Availability
                </div>
                <div className="flex items-center">
                  <Icons.returnIcon className="w-5 h-5 mr-2 text-muted-foreground"/>
                  <span className="font-semibold">Return Delivery</span>
                </div>
                <div className="text-sm text-muted-foreground">Free 30 Days Delivery Returns. <a href="#"
                                                                                                     className="text-primary">Details</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Store Banner */}
      <div className="bg-secondary rounded-md shadow-md p-4 mt-4">
        <div className="flex items-center">
          <img
            src={store.image}
            alt={store.name}
            className="rounded-full w-20 h-20 object-cover mr-4"/>
          <div>
            <h2 className="text-xl font-semibold">{store.name}</h2>
            <Link href={`/store/${store.id}`}>
              <Button size="sm">
                Visit store
              </Button>
            </Link>
          </div>
        </div>
      </div>

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
            <Icons.loader className="h-6 w-6 animate-spin mx-auto mb-2"/>
            <p>Loading similar products...</p>
          </div>
        )}
      </div>
          {/* Customer Reviews (Mock Data) */}
          <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
              <div className="space-y-4">
                  <Card>
                      <CardHeader>
                          <div className="flex items-center justify-between">
                              <CardTitle>John Doe</CardTitle>
                              <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                      <Star key={i} className="h-4 w-4 text-yellow-500"/>
                                  ))}
                              </div>
                          </div>
                      </CardHeader>
                      <CardContent>
                          <CardDescription>
                              This Barong Tagalog is absolutely stunning! The quality of the embroidery is top-notch,
                              and it fits perfectly. I received so many compliments when I wore it to a formal event.
                              Thank you, House of HABI!
                          </CardDescription>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <div className="flex items-center justify-between">
                              <CardTitle>Jane Smith</CardTitle>
                              <div className="flex items-center">
                                  {[...Array(4)].map((_, i) => (
                                      <Star key={i} className="h-4 w-4 text-yellow-500"/>
                                  ))}
                              </div>
                          </div>
                      </CardHeader>
                      <CardContent>
                          <CardDescription>
                              I recently purchased the Handwoven Basket and was blown away by the craftsmanship. It’s
                              both beautiful and functional, adding a touch of Filipino artistry to my home.
                              Tagolwanen Women Weavers did an amazing job!
                          </CardDescription>
                      </CardContent>
                  </Card>
              </div>
          </div>
          {/* Shipping and Return Policy (Mock Data) */}
          <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Shipping & Returns</h2>
              <Card>
                  <CardContent>
                      <CardDescription>
                          We offer shipping within Cagayan de Oro and throughout the Philippines.
                          <br/>
                          Shipping Costs:
                          <ul>
                              <li>Cagayan de Oro: PHP 50.00</li>
                              <li>Other areas in the Philippines: PHP 150.00</li>
                          </ul>
                          Estimated Delivery Times:
                          <ul>
                              <li>Cagayan de Oro: 2-3 business days</li>
                              <li>Other areas in the Philippines: 5-7 business days</li>
                          </ul>
                          Returns:
                          We accept returns within 30 days of purchase. Please contact us for more information.
                      </CardDescription>
                  </CardContent>
              </Card>
          </div>
    </div>
  );
};

export default ProductDetailPage;
