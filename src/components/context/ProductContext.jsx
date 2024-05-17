/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { database } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, 'products');

      try {
        onValue(dbRef, (snapshot) => {
          const data = snapshot.val() || [];
          setProducts(data);
          setLoading(false);
        });
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupedProducts = products.reduce((acc, curr) => {
    acc[curr.categoryTitle] = [...(acc[curr.categoryTitle] || []), curr];
    return acc;
  }, {});

  const productsCategories = products.reduce((acc, curr) => {
    acc[curr.category] = [...(acc[curr.category] || []), curr];
    return acc;
  }, {});

  const getRandomProducts = (arr, n) => {
    const copiedArray = [...arr];
    const shuffled = copiedArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const randomProducts = getRandomProducts(products, 4);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        groupedProducts,
        productsCategories,
        randomProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
