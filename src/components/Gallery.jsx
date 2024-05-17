import styles from './Gallery.module.css';
import { Link } from 'react-router-dom';
import playStationImage from '../assets/1-Feature-Image.png';
import speakersImage from '../assets/2-Feature-Image.png';
import perfumeImage from '../assets/3-Feature-Image.png';
import i18n from '../LanguageConfig';

function Gallery() {
  return (
    <section className="container">
      <div className={styles.galleryContainer}>
        <div className={styles.GalleryTitle}>
          <div className={styles.productTitleText}>
            <p className={styles.productSubTitle}>
              {i18n.t('featuredGallery.subTitle')}
            </p>
            <h2 className={styles.productMainTitle}>
              {i18n.t('featuredGallery.title')}
            </h2>
          </div>
        </div>

        <div className={styles.gallery}>
          <div className={styles.galleryOne}>
            <img src={playStationImage} />
            <h4>{i18n.t('featuredGallery.playStation.title')}</h4>
            <p>{i18n.t('featuredGallery.playStation.description')}</p>
            <Link>{i18n.t('shop')}</Link>
          </div>

          <div className={styles.galleryTwo}>
            <div className={styles.firstGallery}>
              <h4>{i18n.t('featuredGallery.womenCollections.title')}</h4>
              <p>{i18n.t('featuredGallery.womenCollections.description')}</p>
              <Link>{i18n.t('shop')}</Link>
            </div>

            <div className={styles.secondGallery}>
              <div className={styles.speakersGallery}>
                <img src={speakersImage} />
                <h4>{i18n.t('featuredGallery.speakers.title')}</h4>
                <p>{i18n.t('featuredGallery.speakers.description')}</p>
                <Link>{i18n.t('shop')}</Link>
              </div>
              <div className={styles.PerfumeGallery}>
                <img src={perfumeImage} />
                <h4>{i18n.t('featuredGallery.perfume.title')}</h4>
                <p>{i18n.t('featuredGallery.perfume.description')}</p>
                <Link>{i18n.t('shop')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
