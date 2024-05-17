import { useState, useEffect } from 'react';
import styles from './GoToUpArrow.module.css';
function GoToUpArrow() {
  const [showButton, setShowButton] = useState(true);
  const onScroll = () => {
    window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      className={showButton ? styles.showButton : styles.hidden}
      onClick={scrollToTop}
    >
      <svg
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 17V1M1 8L8 1L15 8"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default GoToUpArrow;
