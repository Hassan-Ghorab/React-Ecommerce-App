import { useContext } from 'react';
import styles from './OurProducts.module.css';
import ProductItem from '../components/products/ProductItem';
import { ProductContext } from '../components/context/ProductContext';
import ProductOperations from '../components/products/ProductOperations';
import { useWishlist } from '../components/context/WishlistContext';
import { Link } from 'react-router-dom';
import i18n from '../LanguageConfig';

function OurProducts() {
  const { filteredProducts } = useContext(ProductContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleToggleWishlist = (productItem) => {
    if (isInWishlist(productItem.id)) {
      removeFromWishlist(productItem.id);
    } else {
      addToWishlist({ ...productItem });
    }
  };

  return (
    <div dir={i18n.t('dir')} className="container">
      <h2 className={styles.ourProductsTitle}>{i18n.t('allProducts.ourProducts')}</h2>

      <div className={styles}>
        <div className={styles.ourProducts}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.categoryProduct}>
              <ProductItem productItem={product} className={styles}>
                <ProductOperations>
                  <div className={styles.showOrWishProduct}>
                    <button
                      className={styles.WishListBtn}
                      onClick={() => handleToggleWishlist(product)}
                    >
                      <svg
                        width="34"
                        height="34"
                        viewBox="0 0 34 34"
                        xmlns="http://www.w3.org/2000/svg"
                        className={
                          isInWishlist(product.id)
                            ? styles.wishListSVGActive
                            : styles.wishListSVG
                        }
                      >
                        <circle cx="17" cy="17" r="17" fill="white" />
                        <path
                          d="M13 10C10.7912 10 9 11.7396 9 13.8859C9 15.6185 9.7 19.7305 16.5904 23.8873C16.7138 23.961 16.8555 24 17 24C17.1445 24 17.2862 23.961 17.4096 23.8873C24.3 19.7305 25 15.6185 25 13.8859C25 11.7396 23.2088 10 21 10C18.7912 10 17 12.3551 17 12.3551C17 12.3551 15.2088 10 13 10Z"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <Link
                      className={styles.cartBtn}
                      to={`/${product.categoryTitle}/${product.title}`}
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
                  </div>
                </ProductOperations>
              </ProductItem>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurProducts;
