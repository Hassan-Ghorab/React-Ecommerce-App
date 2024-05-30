/* eslint-disable react/prop-types */
import { getImageUrl } from '../../utils/image-utils';
import { useCart } from '../context/CartContext';
import ProductReview from './ProductReview';
import styles from './ProductItem.module.css';
import { useLanguage } from '../context/LanguageContext';
import i18n from '../../LanguageConfig';

function ProductItem({ productItem, children }) {
  const { title, title_ar, price, id, image, reviews, discount, status } =
    productItem;

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

  console.log(getImageUrl(image));

  return (
    <li className={styles.productContainer}>
      <div className={styles.productDetails}>
        <div className={styles.productShowInfo}>
          <div className={styles.productSubInfo}>
            <div className={styles.productDiscountContainer}>
              {discount !== 0 && (
                <span className={styles.productDiscountPercentage}>
                  {Math.round(((price - discount) / price) * 100)}%
                </span>
              )}
            </div>
            <div>
              {status && (
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
            src={getImageUrl(image)}
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
        {language === 'en' ? title : title_ar}
      </h4>

      <div className={styles.productPrice}>
        {discount !== 0 ? (
          <span className={styles.productDiscount}>${discount}</span>
        ) : null}
        <span className={discount !== 0 ? styles.falsePrice : null}>
          ${price}
        </span>
      </div>
      <div className={styles.productsReviewsContainer}>
        <ProductReview productReviewsStarts={stars} />({reviewNumbers})
      </div>
    </li>
  );
}

export default ProductItem;
