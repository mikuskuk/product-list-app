import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  category: string;
  description: string;
}

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/b54fe93f-f5a1-426b-a76c-e43d246901fd');
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }

        const data = await response.json();
        const product = data.products.find((p: Product) => p.id === Number(id));

        if (product) {
          setProduct(product);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {product ? (
        <div className="border border-gray-200 p-6 rounded-lg">
          <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>
          <p className="text-lg text-gray-500">Price: {product.price} {product.currency}</p>
          <p className="text-lg text-gray-500 mt-1">Category: {product.category}</p>
          <p className="text-gray-600 mt-4">Description: {product.description}</p>
        </div>
      ) : (
        <p className="text-2xl text-center mt-8">Loading...</p>
      )}
    </div>
  );
}

export default ProductDetails;
