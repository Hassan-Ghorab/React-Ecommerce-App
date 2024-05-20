import CountdownTimer from './products/CountdownTimer';
import styles from './ProductOffer.module.css';
import CategoriesImage from '../assets/Category-Image.png';
import i18n from '../LanguageConfig';
function ProductOffer() {
  return (
    <section className="container">
      <div className={styles.productOffer}>
        <div className={styles.productOfferText}>
          <h4>{i18n.t('offer.greenTitle')}</h4>
          <h2>{i18n.t('offer.title')}</h2>
          <div className={styles.offerCountdownTimer}>
            <CountdownTimer time={'June 15, 2024 00:00:00'} />
          </div>
          <button>{i18n.t('offer.buyNow')}!</button>
        </div>
        <div>
          <img
            className={styles.productOfferImage}
            src={CategoriesImage}
            alt="AEnhance Your Listening Experience"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default ProductOffer;
