/* eslint-disable react/prop-types */
import styles from './ProductTitle.module.css';

function ProductTitle({ onScrollToPrevious, onScrollToNext, children }) {
  return (
    <div className={styles.productTitleContainer}>
      <div className={styles.productTitle}>{children}</div>
      <div className={styles.navigationButtons}>
        <button className={styles.sliderRightBtns} onClick={onScrollToPrevious}>
          <svg
            width="19"
            height="16"
            viewBox="0 0 19 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 8H18M18 8L11 1M18 8L11 15"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className={styles.sliderLeftBtns} onClick={onScrollToNext}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 5L4 12L11 19M4 12H20"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ProductTitle;
