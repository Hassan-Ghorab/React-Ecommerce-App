import Banner from './Banner';
import HeroSectionCategories from './HeroSectionCategories';
import styles from './HeroSection.module.css';

function HeroSection() {
  return (
    <section className="container">
      <div className={styles.heroSectionContainer}>
        <HeroSectionCategories />
        <Banner />
      </div>
    </section>
  );
}

export default HeroSection;
