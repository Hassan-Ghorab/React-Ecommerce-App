import styles from './CTA.module.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import i18n from '../../../LanguageConfig'; // Import useTranslation hook

function CTA() {
  const { language, changeLanguage } = useLanguage(); // First useContext // Second useContext, but it comes after useCallback

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    changeLanguage(newLanguage);
  };

  return (
    <div className={styles.offer}>
      <div className="container">
        <div className={styles.offerContainer}>
          <div className={styles.emptyDiv}></div>
          <p className={styles.offerText}>
            <span>{i18n.t('CTA')} </span> 
             <Link className={styles.shopNowLink}>{i18n.t('shop')}</Link>
          </p>
          <select
            className={styles.selectLanguages}
            id="languages"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default CTA;
