import { useState, useContext } from 'react';
import styles from './Navbar.module.css';
import CartOperations from './CartOperations';
import { NavLink, Link } from 'react-router-dom';
import UserAuthContext from '../../context/UserAuthContext';
import i18n from '../../../LanguageConfig';
import { ProductContext } from '../../context/ProductContext';

function Navbar() {
  const { handleSearchInput } = useContext(ProductContext);
  const [openNav, setOpenNav] = useState(false);
  const { isLoggedIn } = useContext(UserAuthContext);

  function handleOpenNav() {
    setOpenNav(!openNav);
  }

  function handleLinkClick() {
    setOpenNav(false);
  }

  const handleChange = (event) => {
    handleSearchInput(event.target.value);
  };

  return (
    <div className="container">
      <nav
        className={`${styles.nav} ${openNav === true ? styles.navOpen : ''}`}
      >
        <div className={styles.navbarContainer}>
          <h3>
            <Link to="/" className={styles.logo}>
              Exclusive
            </Link>
          </h3>

          <div className={styles.mainNav}>
            <NavLink to="/" onClick={handleLinkClick}>
              {i18n.t('headerLinks.home')}
            </NavLink>
            <NavLink to="/ourProducts" onClick={handleLinkClick}>
              {i18n.t('allProducts.ourProducts')}
            </NavLink>
            <NavLink to="/about" onClick={handleLinkClick}>
              {i18n.t('headerLinks.about')}
            </NavLink>
            <NavLink to="/contact" onClick={handleLinkClick}>
              {i18n.t('headerLinks.contact')}
            </NavLink>

            {!isLoggedIn ? (
              <>
                <NavLink to="/signup" onClick={handleLinkClick}>
                  {i18n.t('headerLinks.signup')}
                </NavLink>
                <NavLink to="/login" onClick={handleLinkClick}>
                  {i18n.t('headerLinks.login')}
                </NavLink>
              </>
            ) : null}
          </div>

          <form className={styles.form}>
            <input
              type="text"
              name="search"
              placeholder={i18n.t('searchInput')}
              className={styles.searchInput}
              onChange={handleChange}
            />
          </form>

          <CartOperations />

          <div className={styles.info}>
            <button className={styles.menuBtn} onClick={handleOpenNav}>
              <div className={styles.menuNavIcons} name="menu-outline">
                <svg viewBox="0 0 80 80" width="32" height="32">
                  <rect width="80" height="10" rx="10"></rect>
                  <rect y="30" width="80" height="10" rx="10"></rect>
                  <rect y="60" width="80" height="10" rx="10"></rect>
                </svg>
              </div>

              <div className={styles.menuNavIcons} name="close-outline">
                <svg
                  viewBox="0 0 10 10"
                  width="30px"
                  height="30px"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1,1 9,9 M9,1 1,9" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
