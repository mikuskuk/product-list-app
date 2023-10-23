import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  category: string;
  description: string;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/b54fe93f-f5a1-426b-a76c-e43d246901fd');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Product List</h1>
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={handleSearchInputChange}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
      />
      <ul className="mt-6 space-y-4">
        {currentProducts.map((product) => (
          <li key={product.id} className="border border-gray-200 p-4 rounded-lg">
            <Link to={`/product/${product.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
              {product.name}
            </Link>
            <p className="text-gray-500 mt-1">{product.price} {product.currency}</p>
            <p className="text-gray-500">{product.category}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center">
        {filteredProducts.length > productsPerPage && (
          <ul className="flex space-x-4">
            {Array(Math.ceil(filteredProducts.length / productsPerPage))
              .fill(0)
              .map((_, index) => (
                <li
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`cursor-pointer px-4 py-2 rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {index + 1}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProductList;
