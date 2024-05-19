/* eslint-disable react/prop-types */
import styles from './ViewAllProductsBtn.module.css';
function ViewAllProductsBtn({ onToggleViewAll, text }) {
  return (
    <div className={styles.viewAllProductsBtnContainer}>
      <button className={styles.viewAllProductsBtn} onClick={onToggleViewAll}>
        {text}
      </button>
    </div>
  );
}

export default ViewAllProductsBtn;
