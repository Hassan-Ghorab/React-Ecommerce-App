import Navbar from './Navbar';
import CTA from './CTA';
import styles from './Header.module.css';
function Header() {
  return (
    <header className={styles.header}>
      <CTA />
      <Navbar />
    </header>
  );
}
export default Header;
