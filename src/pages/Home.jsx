import { useState, useRef, useContext } from 'react';
import ProductTitle from '../components/products/ProductTitle';

import HeroSection from '../components/common/heroSection/HeroSection';
import Product from '../components/products/Products';
import styles from './Home.module.css';
import Categories from '../components/Categories';
import ProductOffer from '../components/ProductOffer';
import Gallery from '../components/Gallery';
import Features from '../components/Services';
import GoToUpArrow from '../components/GoToUpArrow';
import ViewAllProductsBtn from '../components/products/ViewAllProductsBtn';
import i18n from '../LanguageConfig';
import { ProductContext } from '../components/context/ProductContext';

function Home() {
  const [bestSellingViewAll, setBestSellingViewAll] = useState(false);
  const [flashSalesViewAll, setFlashSalesViewAll] = useState(false);
  const [exploreViewAll, setExploreViewAll] = useState(false);

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

      <div className={styles.product}>
        <Product
          products={groupedProducts['bestSellingProducts'] || []}
          containerRef={bestSellingRef}
          viewAll={bestSellingViewAll}
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
          </ProductTitle>
        </Product>
        <div className="container">
          <div className={styles.viewAllBtnContainer}>
            <ViewAllProductsBtn
              onToggleViewAll={() => setBestSellingViewAll(!bestSellingViewAll)}
              text={i18n.t('buttons.viewAllProductsButton')}
            />
          </div>
          <hr className={styles.hr} />
        </div>
      </div>

      <div className={styles.product}>
        <Categories />
      </div>

      <div className={styles.product}>
        <Product
          products={groupedProducts['flashSalesProduct'] || []}
          containerRef={flashSalesRef}
          viewAll={flashSalesViewAll}
        >
          <div className={styles.productTitleSecondContainer}>
            <div className={styles.productTitleText}>
              <p className={styles.productSubTitle}>
                {i18n.t('bestSelling.thisMonth')}
              </p>
              <h2 className={styles.productMainTitle}>
                {i18n.t('bestSelling.bestSellingProducts')}
              </h2>
            </div>

            <ViewAllProductsBtn
              onToggleViewAll={() => setFlashSalesViewAll(!flashSalesViewAll)}
              text={i18n.t('buttons.viewAll')}
            />
          </div>
        </Product>
      </div>

      <div className={styles.product}>
        <ProductOffer />
      </div>

      <div className={styles.product}>
        <Product
          products={groupedProducts['exploreOurProduct'] || []}
          containerRef={exploreRef}
          viewAll={exploreViewAll}
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
        <div className="container">
          <div className={styles.viewAllBtnContainer}>
            <ViewAllProductsBtn
              onToggleViewAll={() => setExploreViewAll(!exploreViewAll)}
              text={i18n.t('buttons.viewAllProductsButton')}
            />
          </div>
        </div>
      </div>

      <Gallery />

      <Features />

      <GoToUpArrow />
    </div>
  );
}

export default Home;
