import { useContext } from 'react';
import { CartContext } from '../components/context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../components/context/UserAuthContext';
import ActivePage from '../components/ActivePage';
import styles from './Cart.module.css';
import { useLanguage } from '../components/context/LanguageContext';
import i18n from '../LanguageConfig';
import { getImageUrl } from '../utils/image-utils';

function Cart() {
  const { language } = useLanguage();
  const {
    cartItems,
    removeFromCart,
    handleIncrease,
    handleDecrease,
    totalSum,
  } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (isLoggedIn) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleIncreaseFunc = (productId) => {
    handleIncrease(productId);
  };

  const handleDecreaseFunc = (productId) => {
    handleDecrease(productId);
  };

  const items = cartItems || [];

  return (
    <section className="container">
      <ActivePage>
        <Link to="/cart">{i18n.t('cart.header.cart')}</Link>
      </ActivePage>
      <div className={styles.cartContainer}>
        {cartItems.length !== 0 ? (
          <div className={styles.CartTitles}>
            <h4>{i18n.t('cart.header.product')}</h4>
            <h4>{i18n.t('cart.header.price')}</h4>
            <h4>{i18n.t('cart.header.quantity')}</h4>
            <h4>{i18n.t('cart.header.subtotal')}</h4>
          </div>
        ) : (
          <p className={styles.empty}>{i18n.t('cart.cartStatus')}</p>
        )}

        {items.map((item) => (
          <div
            key={cartItems.id + crypto.randomUUID()}
            className={styles.cartItem}
          >
            <div className={styles.cartInfo}>
              <button onClick={() => handleRemove(item.id)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="9" fill="#DB4444" />
                  <path
                    d="M9 15L12 12M15 9L11.9994 12M11.9994 12L9 9M12 12L15 15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className={styles.cartImageContainer}>
                <img
                  src={getImageUrl(item.image)}
                  alt={language === 'en' ? item.title : item.title_ar}
                  className={styles.cartImage}
                />
              </div>

              <h4>{language === 'en' ? item.title : item.title_ar}</h4>
            </div>

            <div className={styles.cartPrice}>
              ${item.discount || item.price}
            </div>

            <div className={styles.cartQuantity}>
              <p>{item.quantity < 10 ? `0${item.quantity}` : item.quantity}</p>
              <div className={styles.cartQuantityButtons}>
                <button onClick={() => handleIncreaseFunc(item.id)}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.75732 7.36669L4.45732 10.6667L3.51465 9.72402L7.75732 5.48135L12 9.72402L11.0573 10.6667L7.75732 7.36669Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button onClick={() => handleDecreaseFunc(item.id)}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.24268 8.63331L11.5427 5.33331L12.4854 6.27598L8.24268 10.5186L4.00002 6.27598L4.94268 5.33331L8.24268 8.63331Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <p className={styles.cartTotal}>${item.total}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cartBtns}>
        <Link to="/">{i18n.t('buttons.returnToShopLink')}</Link>
        <button>{i18n.t('buttons.updateCartButton')}</button>
      </div>
      <div className={styles.cartTotalContainer}>
        <div className={styles.couponContainer}>
          <input
            type="text"
            className={styles.couponInput}
            placeholder={i18n.t('cart.couponCode')}
          />
          <button>{i18n.t('buttons.applyCouponButton')}</button>
        </div>

        <div className={styles.allCartTotal}>
          <h4>{i18n.t('cart.cartTotal')}</h4>
          <div className={styles.subTotal}>
            <span>{i18n.t('cart.header.subtotal')}:</span>
            <span>${totalSum}</span>
          </div>
          <div className={styles.shipping}>
            <span>{i18n.t('cart.shipping')}:</span>
            <span>Free</span>
          </div>
          <div className={styles.total}>
            <span>{i18n.t('cart.total')}:</span>
            <span>${totalSum}</span>
          </div>

          <button
            className={styles.proceedBtn}
            onClick={handleProceedToCheckout}
          >
            {i18n.t('buttons.processToCheckoutButton')}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cart;
