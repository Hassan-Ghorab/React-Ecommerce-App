/* eslint-disable react/prop-types */
import styles from './ViewAllProductsBtn.module.css';
import i18n from '../../LanguageConfig';
function ViewAllProductsBtn({ onToggleViewAll }) {
  return (
    <div className={styles.viewAllProductsBtnContainer}>
      <button className={styles.viewAllProductsBtn} onClick={onToggleViewAll}>
        {i18n.t('buttons.viewAllProductsButton')}
      </button>
    </div>
  );
}

export default ViewAllProductsBtn;
