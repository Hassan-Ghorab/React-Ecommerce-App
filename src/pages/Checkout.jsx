import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../components/context/CartContext';
import { database } from '../firebaseConfig';
import { push, ref } from 'firebase/database';
import ActivePage from '../components/ActivePage';
import styles from './Checkout.module.css';
import { useLanguage } from '../components/context/LanguageContext';
import i18n from '../LanguageConfig';

function Checkout() {
  const { language } = useLanguage();
  const { cartItems, totalSum, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    townCity: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = () => {
    if (
      Object.values(formData).some((value) => value === '') ||
      paymentMethod === ''
    ) {
      alert('Please fill in all required fields and select payment method');
      return;
    }

    const orderData = {
      cartItems: cartItems.map((item) => ({
        title: item.title,
        image: item.image,
        price: item.discount || item.price,
        quantity: item.quantity,
      })),
      totalSum: totalSum,
      billingDetails: formData,
      paymentMethod: paymentMethod,
    };

    const ordersRef = ref(database, 'orders');
    push(ordersRef, orderData)
      .then(() => {
        console.log('Order placed successfully!');
        setPaymentMethod('');
        setFormData({
          firstName: '',
          companyName: '',
          streetAddress: '',
          apartment: '',
          townCity: '',
          phoneNumber: '',
          email: '',
        });
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
    clearCart();
    navigate('/');
  };

  return (
    <>
      <ActivePage>
        <div className={styles.ActivePageLinks}>
          <Link to="/myAccount" className={styles.notActive}>
            My Account
          </Link>
          <span className={styles.notActive}>/</span>
          <Link to="/home" className={styles.notActive}>
            Product
          </Link>
          <span className={styles.notActive}>/</span>
          <Link to="/cart" className={styles.notActive}>
            View Cart
          </Link>
          <span className={styles.notActive}>/</span>
          <Link to="/checkout">Checkout</Link>
        </div>
      </ActivePage>

      <div dir={i18n.t('dir')} className="container">
        <h2 className={styles.billingDetailsTitle}>
          {i18n.t('checkout.billingDetails')}
        </h2>
        <div className={styles.billingDetails}>
          <form className={styles.checkoutForm}>
            <div className={styles.inputsContainers}>
              <div className={styles.inputContainer}>
                <label htmlFor="firstName">
                  {i18n.t('checkout.firstName')}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="companyName">
                  {i18n.t('checkout.company')}
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="streetAddress">
                  {i18n.t('checkout.address')}
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="apartment">
                  {i18n.t('checkout.apartment')}
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="townCity"> {i18n.t('checkout.city')}</label>
                <input
                  type="text"
                  name="townCity"
                  value={formData.townCity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="phoneNumber"> {i18n.t('checkout.phone')}</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="email">{i18n.t('checkout.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.saveInformationCheckbox}>
                <input
                  type="checkbox"
                  name="saveInformation"
                  className={styles.saveCheckbox}
                  value="Save this information for faster check-out next time"
                />
                <label htmlFor="saveInformation">
                  {i18n.t('checkout.saveInformation')}
                </label>
              </div>
            </div>

            <div className={styles.productsContainer}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.productItem}>
                  <div className={styles.productTitle}>
                    <img
                      src={item.image}
                      alt={language === 'en' ? item.title : item.title.ar}
                      className={styles.checkoutImage}
                    />
                    <h4>
                      alt={language === 'en' ? item.title : item.title.ar}
                    </h4>
                  </div>
                  <div className={styles.cartPrice}>
                    ${item.discount || item.price}
                  </div>
                </div>
              ))}

              <div className={styles.totalContainer}>
                <div className={styles.subTotal}>
                  <span>{i18n.t('cart.header.subtotal')}:</span>
                  <span>${totalSum}</span>
                </div>
                <div className={styles.shipping}>
                  <span>{i18n.t('cart.shipping')}:</span>
                  <span>{i18n.t('cart.free')}</span>
                </div>
                <div className={styles.total}>
                  <span>{i18n.t('cart.total')}:</span>
                  <span>${totalSum}</span>
                </div>
              </div>

              <div className={styles.payOptions}>
                <div className={styles.payBankOption}>
                  <div className={styles.BankRadio}>
                    <input
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      value="Bank"
                      checked={paymentMethod === 'Bank'}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="bank">{i18n.t('checkout.bank')}</label>

                    <div className={styles.BankImages}>
                      <img
                        className={styles.bankImage}
                        alt="bank image"
                        src="https://s3-alpha-sig.figma.com/img/bacb/ff99/a8fc8e50822cb2d2d168e5d0e8bf7ea6?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mxwR1GG6LRqfkqFawAJRsSge4pMjgD7VFajN9iFkoMx9e4UAUaOtBGMh7x-23aDRPAzCKf4gUaIM-w~zlBbduSs8Q1Il-~ElFaeXXu8Vobtgab7sJGFe1gBavVOur8VNJ329RdWFP5vkIfDNp2hMgILJoiyvfcld-9NjAdN37yRk8DCPPd2HRkHjKSwEke5Pv3UmGoEwnoQTr9VKBJW4UwIxcKeuYnJ6CWw6SZG-sQ~XqO5kqqy8DI25oMdhI8rhe9mvi0x3DyvMXXWimnkVipYdgIP8EBIbZTt5vM1Yy2JRIwL5CtHcy2aQ5uaGZlk9dvOJ~P8-w~U43amathoLyw__"
                      />
                      <img
                        className={styles.bankImage}
                        alt="bank image"
                        src="https://s3-alpha-sig.figma.com/img/cfb0/a6ee/01b240273b40dab07f8246ef98aed88a?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SeZW2xE~-~n3BBiak9a8SPUJsdWmMv6veDp4iFIk6mfIb~jJcb5I3JLpx82kTxujifyMDmMwok22z6~svJxxMc5TEMuAJMDaKcj2rvWxGErGogaQ1EW7Aaq8YcvihnNx1cBbjFyF3rzu8KQ5cXjRhrLAITHBSnIEwqKppcBGVpHrmL1miDITP5KM0Y5Xg2JvuXKRkx9PYYxY4VDgbZmox8MSC1TFZ2UO~JCwkhj6zVLqyWMnvSPBXAwyZrKWarYWX8bZJQ6PiuPij-yh1U0Xm7dgm5dJm8a30xbiAqB6PUl0WQIi8E3QaIYUTuy2vmUeZ3kkXzZWoPf6TCya9432Uw__"
                      />
                      <img
                        className={styles.bankImage}
                        alt="bank image"
                        src="https://s3-alpha-sig.figma.com/img/6eef/b61d/27c754abac218d25d8ea4360de61f8e8?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ccfGClMDdRspkaPlVCzpButz8ZNtVhuGV51OSOD4u3IO4Gz8xdE5TazkUko5FrZGGfuWK8kQ3K3sBFnArWNIMQ6X9QS9H-ktohz2WTPAetb4cM0uXhk-4q2Y6FoN~dgNAK1jztYepxTizHokGfyreKb6FivW9pcnCe2ddA~bEJWicNadF-XsHbhfXRQAnDRrZCb2zob5nwhPkpvqdpnB5Xl3G5DOS3aKR5p5O7Q8Dgv9JCn2oNjvKQKHKOBGeSM8hysgkBun5RsrgTnNdOvU1YB40Obz8NsBzCPF-K~ozn1-zil0dvIp-U8GJ3o8ug8OzwEX6MZgyo5LUboxuPVLqQ__"
                      />
                      <img
                        className={styles.bankImage}
                        alt="bank image"
                        src="https://s3-alpha-sig.figma.com/img/b28e/31b9/c88d0c9b038b82deeb0523d82cffe267?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LtIZCdI9xQFR4RCIfFAQeTPYFOzo4fWnYrZXvJpgi688v0-ikWz8~wEwNGf0TlodukpaFiNkNk2cHef0XjNXwvIb8Up9G9oiZq1vwnWXNmDYo~xfOdg0PuA9Y4KNJboMaPd-n2tmjLuulfXpx4bBc9FHUnOMfRFIo~KXWwC74T5e0WlpPv8Uco2HCcY0ngQ-dzZTxe3jkqghSazf~zGcyGQm8GqcBqAd~j7ieB2yV~-vzgJ5xnWzLW9gduBRDvjhVYFIQqCxQWbmWGjGFjwx6QwxZ31XxPNTfxVvbui2kjec6pqS8y60ErfBnkg~JF1cmwEtBQj5nzSsUnAIZ0yXCg__"
                      />
                    </div>
                  </div>

                  <div className={styles.BankRadio}>
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="Cash on delivery"
                      checked={paymentMethod === 'Cash on delivery'}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="cash">{i18n.t('checkout.cash')}</label>
                  </div>
                </div>
              </div>

              <div className={styles.couponContainer}>
                <input
                  type="text"
                  className={styles.couponInput}
                  placeholder={i18n.t('cart.couponCode')}
                />
                <button>{i18n.t('buttons.applyCouponButton')}</button>
              </div>
              <button
                className={styles.placeOrderBtn}
                onClick={handlePlaceOrder}
              >
                {i18n.t('buttons.placeOrderButton')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;
