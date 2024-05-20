/* eslint-disable react/prop-types */
import styles from './ProductOperations.module.css';
function ProductOperations({ children }) {
  return <div className={styles.productOperations}>{children}</div>;
}

export default ProductOperations;
