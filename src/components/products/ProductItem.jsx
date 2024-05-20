/* eslint-disable react/prop-types */
import { useCart } from '../context/CartContext';
import ProductReview from './ProductReview';
import styles from './ProductItem.module.css';
import { useLanguage } from '../context/LanguageContext';
import i18n from '../../LanguageConfig';

function ProductItem({ productItem, children }) {
  const { title, title_ar, image, price, id, reviews, discount, status } =
    productItem;

  // Check if reviews exists before accessing its nested properties
  const stars = reviews && reviews.stars ? reviews.stars : 0;
  const reviewNumbers = reviews && reviews.numbers ? reviews.numbers : 0;

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
                  {Math.round(((price - discount) / price) * 100)}%
                </span>
              )}
            </div>
            <div>
              {productItem.status && (
                <span className={styles.productStatus}>
                  {language === 'en' ? status : 'جديد'}
                </span>
              )}
            </div>
          </div>

          {children}
        </div>
        <div className={styles.productItemImageContainer}>
          <img
            src={image}
            loading="lazy"
            className={styles.image}
            alt={language === 'en' ? title : title_ar}
          />
        </div>
      </div>

      <div className={styles.cartOperationsContainer}>
        {cartItems.some((item) => item.id === id) ? (
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

      <h4 className={styles.productTitle}>
        {language === 'en' ? productItem.title : productItem.title_ar}
      </h4>

      <div className={styles.productPrice}>
        {productItem.discount !== 0 ? (
          <span className={styles.productDiscount}>
            ${productItem.discount}
          </span>
        ) : null}
        <span className={productItem.discount !== 0 ? styles.falsePrice : null}>
          ${productItem.price}
        </span>
      </div>
      <div className={styles.productsReviewsContainer}>
        <ProductReview productReviewsStarts={stars} />({reviewNumbers})
      </div>
    </li>
  );
}

export default ProductItem;
