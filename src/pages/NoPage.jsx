import ActivePage from '../components/ActivePage';
import styles from './NoPage.module.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/context/LanguageContext';

function NoPage() {
  const { language } = useLanguage();
  return (
    <div className="container">
      <ActivePage>
        <Link to="/NoPage">{language === 'en' ? 'NoPage' : 'صفحة غير موجودة'}</Link>
      </ActivePage>

      <div className={styles.notFoundContainer}>
        <h2 className={styles.notFoundTitle}>
          {language === 'en' ? '404 Not Found' : '404 غير موجود'}
        </h2>
        <p>
          {language === 'en'
            ? 'Your visited page not found. You may go home page.'
            : 'الصفحة التي زرتها غير موجودة. قد تذهب إلى الصفحة الرئيسية.'}
        </p>
        <Link to="/" className={styles.backHome}>
          {language === 'en' ? 'Back to home page' : 'العودة إلى الصفحة الرئيسية'}
        </Link>
      </div>
    </div>
  );
}

export default NoPage;
