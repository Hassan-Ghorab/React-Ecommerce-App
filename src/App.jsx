import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/common/header/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyAccount from './pages/MyAccount';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import NoPage from './pages/NoPage';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from './components/context/CartContext';
import { WishlistProvider } from './components/context/WishlistContext';
import { UserAuthProvider } from './components/context/UserAuthContext';
import { ProductProvider } from './components/context/ProductContext';
import { LanguageProvider } from './components/context/LanguageContext';


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <LanguageProvider>
      <UserAuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ProductProvider>
              {isLoading ? (
                <div className="loading-state">
                  <div className="loading"></div>
                </div>
              ) : (
                <BrowserRouter>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/myAccount" element={<MyAccount />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route
                      path="/:categoryTitle/:title"
                      element={<ProductDetails />}
                    />
                    <Route path="*" element={<NoPage />} />
                  </Routes>
                  <Footer />
                </BrowserRouter>
              )}
            </ProductProvider>
          </WishlistProvider>
        </CartProvider>
      </UserAuthProvider>
    </LanguageProvider>
  );
}

export default App;
