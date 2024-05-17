/* eslint-disable react/prop-types */
import { useCart } from '../context/CartContext';
import ProductReview from './ProductReview';
import styles from './ProductItem.module.css';
import { useLanguage } from '../context/LanguageContext';
import i18n from '../../LanguageConfig';

function ProductItem({ productItem, children }) {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { language } = useLanguage();
  const handleAddToCart = () => {
    addToCart(productItem);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(productItem.id);
  };

  return (
    <li className={styles.productContainer}>
      <div className={styles.productDetails}>
        <div className={styles.productShowInfo}>
          <div className={styles.productSubInfo}>
            <div className={styles.productDiscountContainer}>
              {productItem.discount !== 0 && (
                <span className={styles.productDiscountPercentage}>
                  {Math.round(
                    ((productItem.price - productItem.discount) /
                      productItem.price) *
                      100
                  )}
                  %
                </span>
              )}
            </div>
            <div>
              {productItem.status && (
                <span className={styles.productStatus}>
                  {language === 'en' ? productItem.status : 'جديد'}
                </span>
              )}
            </div>
          </div>

          {children}
        </div>
        <img
          src={productItem.image}
          loading="lazy"
          className={styles.image}
          alt={language === 'en' ? productItem.title : productItem.title_ar}
        />
      </div>

      <div className={styles.cartOperationsContainer}>
        {cartItems.some((item) => item.id === productItem.id) ? (
          <button
            onClick={() => handleRemoveFromCart(productItem.id)}
            className={styles.removeFromCartButton}
          >
            {i18n.t('buttons.removeFromCart')}
          </button>
        ) : (
          <button
            onClick={() => handleAddToCart(productItem)}
            className={styles.addToCartButton}
          >
            {i18n.t('buttons.addToCart')}
          </button>
        )}
      </div>

      <h4 className={styles.productName}>
        {language === 'en' ? productItem.title : productItem.title_ar}
      </h4>

      <div className={styles.productPrice}>
        {productItem.discount !== 0 ? (
          <span className={styles.productDiscount}>{productItem.discount}</span>
        ) : null}
        <span className={productItem.discount !== 0 ? styles.falsePrice : null}>
          {productItem.price}
        </span>
      </div>
      <div className={styles.productsReviewsContainer}>
        <ProductReview
          productReviewsStarts={productItem.reviews.stars}
        />
        ({productItem.reviews.numbers})
      </div>
    </li>
  );
}

export default ProductItem;
