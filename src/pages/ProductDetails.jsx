/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ActivePage from '../components/ActivePage';
import styles from './ProductDetails.module.css';
import ProductReview from '../components/products/ProductReview';
import { useCart } from '../components/context/CartContext';
import { useWishlist } from '../components/context/WishlistContext';
import { ProductContext } from '../components/context/ProductContext';
import ProductItem from '../components/products/ProductItem';
import { useLanguage } from '../components/context/LanguageContext';
import i18n from '../LanguageConfig';
import { Link } from 'react-router-dom';
import ProductOperations from '../components/products/ProductOperations';
import { getImageUrl } from '../utils/image-utils';

function ProductDetails() {
  const { language } = useLanguage();
  const { products, loading, error, productsCategories } =
    useContext(ProductContext);
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const {
    cartItems,
    addToCart,
    removeFromCart,
    handleIncrease,
    handleDecrease,
  } = useCart();

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [mainImage, setMainImage] = useState(products.image);

  useEffect(() => {
    if (!loading && products) {
      const productData = products.find(
        (item) =>
          item.categoryTitle === params.categoryTitle &&
          item.title === params.title
      );

      if (productData) {
        setProduct(productData);
      }
    }
  }, [loading, products, params.categoryTitle, params.title]);

  useEffect(() => {
    if (product && productsCategories[product.category]) {
      const filteredProducts = productsCategories[product.category].filter(
        (relatedProduct) => relatedProduct.id !== product.id
      );
      setRelatedProducts(filteredProducts);
    }
  }, [product, productsCategories]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = (product) => {
    addToCart({ ...product });
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleIncreaseFunc = (productId) => {
    handleIncrease(productId);
  };

  const handleDecreaseFunc = (productId) => {
    handleDecrease(productId);
  };

  const productInCart = cartItems.find((item) => item.id === product.id);
  const quantityInCart = productInCart ? productInCart.quantity : 0;

  const handleToggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({ ...product });
    }
  };

  const handleThumbnailClick = () => {
    setMainImage(getImageUrl(product.image));
  };

  return (
    <div dir={i18n.t('dir')}>
      <ActivePage>
        <span className={styles.productCategory}>
          {language === 'en' ? product.category : product.category_ar}
        </span>
        <span>/</span>
        <span>{language === 'en' ? product.title : product.title_ar}</span>
      </ActivePage>
      <div className="container">
        <div className={styles.productDetailsContainer}>
          <div className={styles.productDetailsImagesContainer}>
            <div className={styles.productDetailsImagesFirstContainer}>
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={styles.productDetailsImageContainer}
                >
                  <img
                    className={styles.productDetailsImage}
                    src={getImageUrl(product.image)}
                    alt={language === 'en' ? product.title : product.title_ar}
                    onClick={() => handleThumbnailClick(product.image)}
                  />
                </div>
              ))}
            </div>
            <div className={styles.mainProductDetailsImageContainer}>
              <img
                className={styles.mainProductDetailsImage}
                src={mainImage || getImageUrl(product.image)}
                alt={language === 'en' ? product.title : product.title_ar}
              />
            </div>
          </div>

          <div className={styles.productDetailsInfo}>
            <h2>{language === 'en' ? product.title : product.title_ar}</h2>

            <div className={styles.productsDefaultReviewsContainer}>
              <ProductReview productReviewsStarts={product.reviews.stars} />
              <span className={styles.numberOfReviews}>
                ({product.reviews.numbers}{' '}
                {i18n.t('productDetailsPage.reviews')})
              </span>
              <span className={styles.divider}>|</span>
              <span className={styles.inStock}>
                {i18n.t('productDetailsPage.inStock')}
              </span>
            </div>
            <h4>${product.discount || product.price}.00</h4>
            <p className={styles.productDetailsDescription}>
              {language === 'en' ? product.details : product.details_ar}
            </p>

            <div className={styles.colors}>
              <p>{i18n.t('productDetailsPage.colors')}:</p>
              <span className={styles.blueColor}></span>
              <span className={styles.redColor}></span>
            </div>

            <div className={styles.sizes}>
              <p>{i18n.t('productDetailsPage.size')}:</p>
              <span>XS</span>
              <span>S</span>
              <span className={styles.activeSize}>M</span>
              <span>L</span>
              <span>XL</span>
            </div>

            <div className={styles.productDetailsOperationsContainer}>
              <div className={styles.quantity}>
                <button
                  className={styles.decreaseBtn}
                  onClick={() => handleDecreaseFunc(product.id)}
                >
                  -
                </button>
                <span className={styles.quantityInCart}>
                  {quantityInCart || 0}
                </span>
                <button
                  className={`${styles.increaseBtn} ${
                    quantityInCart > 0
                      ? styles.quantityInCartActive
                      : styles.increaseBtn
                  }`}
                  onClick={() => handleIncreaseFunc(product)}
                >
                  +
                </button>
              </div>
              <div className={styles.productDetailsOperations}>
                {cartItems.some((item) => item.id === product.id) ? (
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    className={styles.removeFromCartButton}
                  >
                    {i18n.t('buttons.removeFromCart')}
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={styles.addToCartButton}
                  >
                    {i18n.t('buttons.buyNowButton')}
                  </button>
                )}
              </div>

              <button
                className={styles.mainWishListBtn}
                onClick={() => handleToggleWishlist(product)}
              >
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    isInWishlist(product.id)
                      ? styles.wishListSVGActive
                      : styles.wishListSVG
                  }
                >
                  <path
                    x="0.5"
                    y="0.5"
                    width="41"
                    height="41"
                    rx="4.5"
                    stroke="black"
                    strokeOpacity="0.5"
                  />
                  <path
                    d="M16 12C13.239 12 11 14.216 11 16.95C11 19.157 11.875 24.395 20.488 29.69C20.6423 29.7839 20.8194 29.8335 21 29.8335C21.1806 29.8335 21.3577 29.7839 21.512 29.69C30.125 24.395 31 19.157 31 16.95C31 14.216 28.761 12 26 12C23.239 12 21 15 21 15C21 15 18.761 12 16 12Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div>
              <div className={styles.productDetailsDelivery}>
                <div>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_261_4843)">
                      <path
                        d="M11.6673 31.6667C13.5083 31.6667 15.0007 30.1743 15.0007 28.3333C15.0007 26.4924 13.5083 25 11.6673 25C9.82637 25 8.33398 26.4924 8.33398 28.3333C8.33398 30.1743 9.82637 31.6667 11.6673 31.6667Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.33398 28.3335H7.00065C5.89608 28.3335 5.00065 27.4381 5.00065 26.3335V21.6668M3.33398 8.3335H19.6673C20.7719 8.3335 21.6673 9.22893 21.6673 10.3335V28.3335M15.0007 28.3335H25.0007M31.6673 28.3335H33.0007C34.1052 28.3335 35.0007 27.4381 35.0007 26.3335V18.3335M35.0007 18.3335H21.6673M35.0007 18.3335L30.5833 10.9712C30.2218 10.3688 29.5708 10.0002 28.8683 10.0002H21.6673"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 11.8182H11.6667"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.81836 15.4545H8.48503"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 19.0909H11.6667"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_261_4843">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className={styles.deliveryText}>
                  <h4>{i18n.t('productDetailsPage.freeDelivery')}</h4>
                  <p>{i18n.t('productDetailsPage.enterPostalCode')}</p>
                </div>
              </div>

              <div className={styles.productDetailsDelivery}>
                <div>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_261_4865)">
                      <path
                        d="M33.3327 18.3334C32.9251 15.4004 31.5645 12.6828 29.4604 10.5992C27.3564 8.51557 24.6256 7.18155 21.6888 6.80261C18.752 6.42366 15.7721 7.02082 13.208 8.5021C10.644 9.98337 8.6381 12.2666 7.49935 15M6.66602 8.33335V15H13.3327"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.66602 21.6667C7.07361 24.5997 8.43423 27.3173 10.5383 29.4009C12.6423 31.4845 15.3731 32.8185 18.3099 33.1974C21.2467 33.5764 24.2266 32.9792 26.7907 31.4979C29.3547 30.0167 31.3606 27.7335 32.4994 25M33.3327 31.6667V25H26.666"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_261_4865">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className={styles.deliveryText}>
                  <h4>{i18n.t('productDetailsPage.returnDelivery')}</h4>
                  <p>{i18n.t('productDetailsPage.free30Days')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.productDetailsRelatedItems}>
          <h2 className={styles.productTitle}>
            {i18n.t('productDetailsPage.relatedItems')}
          </h2>
          {relatedProducts && relatedProducts.length > 0 ? (
            <div className={styles.productCategoryContainer}>
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className={styles.categoryProduct}>
                  <ProductItem
                    productItem={relatedProduct}
                    className={styles.categoryProductItem}
                  >
                    <ProductOperations>
                      <div className={styles.showOrWishProduct}>
                        <button
                          className={styles.WishListBtn}
                          onClick={() => handleToggleWishlist(relatedProduct)}
                        >
                          <svg
                            width="34"
                            height="34"
                            viewBox="0 0 34 34"
                            xmlns="http://www.w3.org/2000/svg"
                            className={
                              isInWishlist(relatedProduct.id)
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
                          to={`/${relatedProduct.categoryTitle}/${relatedProduct.title}`}
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
          ) : (
            <p className={styles.empty}>No Related Item</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
