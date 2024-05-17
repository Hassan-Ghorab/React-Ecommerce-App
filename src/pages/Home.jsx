/* eslint-disable react/prop-types */
import { useRef, useContext } from 'react';
import ProductTitle from '../components/products/ProductTitle';
import CountdownTimer from '../components/products/CountdownTimer';
import HeroSection from '../components/common/heroSection/HeroSection';
import Product from '../components/products/Products';
import styles from './Home.module.css';
import Categories from '../components/Categories';
import ProductOffer from '../components/ProductOffer';
import Gallery from '../components/Gallery';
import Features from '../components/Services';
import GoToUpArrow from '../components/GoToUpArrow';
import i18n from '../LanguageConfig';
import { ProductContext } from '../components/context/ProductContext';

function Home() {
  const { groupedProducts } = useContext(ProductContext);

  const bestSellingRef = useRef(null);
  const flashSalesRef = useRef(null);
  const exploreRef = useRef(null);

  const productWidth = 250;

  const scrollToNext = (ref) => {
    ref.current.scrollLeft += productWidth;
  };

  const scrollToPrevious = (ref) => {
    ref.current.scrollLeft -= productWidth;
  };

  return (
    <div dir={i18n.t('dir')}>
      <HeroSection />

      <Product
        products={groupedProducts['bestSellingProducts'] || []}
        containerRef={bestSellingRef}
      >
        <ProductTitle
          onScrollToNext={() => scrollToNext(bestSellingRef)}
          onScrollToPrevious={() => scrollToPrevious(bestSellingRef)}
        >
          <div className={styles.productTitleText}>
            <p className={styles.productSubTitle}>
              {i18n.t('FlashSales.todays')}
            </p>
            <h2 className={styles.productMainTitle}>
              {i18n.t('FlashSales.flashSales')}
            </h2>
          </div>
          <CountdownTimer time={'June 15, 2024 00:00:00'} />
        </ProductTitle>
      </Product>

      <Categories />

      <Product
        products={groupedProducts['flashSalesProduct'] || []}
        containerRef={flashSalesRef}
      >
        <ProductTitle
          onScrollToNext={() => scrollToNext(flashSalesRef)}
          onScrollToPrevious={() => scrollToPrevious(flashSalesRef)}
        >
          <div className={styles.productTitleText}>
            <p className={styles.productSubTitle}>
              {i18n.t('bestSelling.thisMonth')}
            </p>
            <h2 className={styles.productMainTitle}>
              {i18n.t('bestSelling.bestSellingProducts')}
            </h2>
          </div>
        </ProductTitle>
      </Product>

      <ProductOffer />

      <Product
        products={groupedProducts['exploreOurProduct'] || []}
        containerRef={exploreRef}
      >
        <ProductTitle
          onScrollToNext={() => scrollToNext(exploreRef)}
          onScrollToPrevious={() => scrollToPrevious(exploreRef)}
        >
          <div className={styles.productTitleText}>
            <div className={styles.productTitleText}>
              <p className={styles.productSubTitle}>
                {i18n.t('allProducts.ourProducts')}
              </p>
              <h2 className={styles.productMainTitle}>
                {i18n.t('allProducts.exploreOurProducts')}
              </h2>
            </div>
          </div>
        </ProductTitle>
      </Product>

      <Gallery />

      <Features />

      <GoToUpArrow />
    </div>
  );
}

export default Home;
