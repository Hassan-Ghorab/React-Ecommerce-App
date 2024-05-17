/* eslint-disable react/prop-types */
import styles from './ActivePage.module.css';
import { Link } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext';

function ActivePage({ children }) {
  const { language } = useLanguage();
  return (
    <div className="container">
      <div className={styles.ActivePageLinks}>
        <Link to="/" className={styles.notActiveLink}>
          {language === 'ar' ? 'الرئيسية' : 'Home'}
        </Link>
        <span className={styles.notActiveLink}>/</span>
        {children}
      </div>
    </div>
  );
}

export default ActivePage;
