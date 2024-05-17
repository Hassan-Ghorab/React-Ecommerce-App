import styles from './HeroSectionCategories.module.css';
import { Link } from 'react-router-dom';
import i18n from '../../../LanguageConfig';
function HeroSectionCategories() {
  return (
    <ul dir={i18n.t('dir')} className={styles.categories}>
      <li>
        <Link className={styles.arrowCategory}>
          <span>{i18n.t('heroSection.categoriesLinks.womenFashion')}</span>
          <span>
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.95 6.63597L0 1.68597L1.414 0.271973L7.778 6.63597L1.414 13L0 11.586L4.95 6.63597Z"
                fill="black"
              />
            </svg>
          </span>
        </Link>
      </li>
      <li>
        <Link className={styles.arrowCategory}>
          <span>{i18n.t('heroSection.categoriesLinks.menFashion')}</span>
          <span>
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.95 6.63597L0 1.68597L1.414 0.271973L7.778 6.63597L1.414 13L0 11.586L4.95 6.63597Z"
                fill="black"
              />
            </svg>
          </span>
        </Link>
      </li>
      <li>
        <Link>{i18n.t('heroSection.categoriesLinks.homeLifestyle')}</Link>
      </li>
      <li>
        <Link>{i18n.t('heroSection.categoriesLinks.medicine')}</Link>
      </li>
      <li>
        <Link>{i18n.t('heroSection.categoriesLinks.sportsOutdoor')}</Link>
      </li>
      <li>
        <Link>{i18n.t('heroSection.categoriesLinks.babyToys')}</Link>
      </li>
      <li>
        <Link>{i18n.t('heroSection.categoriesLinks.groceriesPets')}</Link>
      </li>
      <li>
        <Link>{i18n.t('heroSection.categoriesLinks.healthBeauty')}</Link>
      </li>
    </ul>
  );
}

export default HeroSectionCategories;
