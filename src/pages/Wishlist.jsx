/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import { useWishlist } from '../components/context/WishlistContext';
import { useCart } from '../components/context/CartContext';
import { ProductContext } from '../components/context/ProductContext';
import styles from './Wishlist.module.css';
import { Link } from 'react-router-dom';
import ProductItem from '../components/products/ProductItem';

import i18n from '../LanguageConfig';

function Wishlist() {
  const { wishlistItems, removeFromWishlist, wishlistItemCount } =
    useWishlist();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { randomProducts } = useContext(ProductContext);
  const [isMoveAll, setIsMoveAll] = useState(true);

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const moveAllToggle = () => {
    wishlistItems.forEach((item) => {
      if (cartItems.some((cartItem) => cartItem.id === item.id)) {
        removeFromCart(item.id);
      } else {
        addToCart(item);
      }
    });

    setIsMoveAll((prevState) => !prevState);
  };

  return (
    <div dir={i18n.t('dir')} className="container">
      <div className={styles.wishlist}>
        <div className={styles.wishlistHeader}>
          <h2 className={styles.title}>
            {i18n.t('wishlist.title')}({wishlistItemCount})
          </h2>
          <button onClick={moveAllToggle}>
            {!isMoveAll
              ? `${i18n.t('buttons.removeAllToBagButton')}`
              : `${i18n.t('buttons.moveAllToBagButton')}`}
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <p className={styles.empty}>Your wishlist is empty.</p>
        ) : (
          <ul className={styles.wishlistItems}>
            {wishlistItems.map((item) => (
              <ProductItem key={item.id} productItem={item}>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="17" cy="17" r="17" fill="white" />
                    <path
                      d="M25 10.5714H10.3333L11.6667 26H22.3333L23.6667 10.5714H9M17 14.4286V22.1429M20.3333 14.4286L19.6667 22.1429M13.6667 14.4286L14.3333 22.1429M14.3333 10.5714L15 8H19L19.6667 10.5714"
                      stroke="black"
                      strokeWidth="1.56"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </ProductItem>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.wishlistJustForYou}>
        <div className={styles.productTitleText}>
          <h3 className={styles.productSubTitle}>
            {i18n.t('wishlist.justForYou')}
          </h3>
          <Link to="/">{i18n.t('buttons.seeAllButton')}</Link>
        </div>

        <ul className={styles.wishlistItems}>
          {randomProducts.map((item) => (
            <ProductItem key={item.id} productItem={item}>
              <Link
                className={styles.showProductBtn}
                to={`/${item.categoryTitle}/${item.title}`}
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="17" cy="17" r="17" fill="white" />
                  <path
                    d="M26.257 15.962C26.731 16.582 26.731 17.419 26.257 18.038C24.764 19.987 21.182 24 17 24C12.818 24 9.23601 19.987 7.74301 18.038C7.51239 17.7411 7.38721 17.3759 7.38721 17C7.38721 16.6241 7.51239 16.2589 7.74301 15.962C9.23601 14.013 12.818 10 17 10C21.182 10 24.764 14.013 26.257 15.962V15.962Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 20C18.6569 20 20 18.6569 20 17C20 15.3431 18.6569 14 17 14C15.3431 14 14 15.3431 14 17C14 18.6569 15.3431 20 17 20Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </ProductItem>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Wishlist;
