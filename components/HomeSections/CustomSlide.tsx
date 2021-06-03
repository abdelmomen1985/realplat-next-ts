import React, { useContext } from 'react'
import clsx from 'clsx'
import styles from './homeStyles.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "./../../hooks/useTranslation";
import { AppContext } from './../../Context/AppContextProvider';
import router from 'next/router';

interface Slide {
  _id: string;
  image: string;
  name: {
    ar: string;
    en: string;
  }
}
const CustomSlide = ({ imgs }: { imgs: Slide[] }) => {
  const { locale } = useTranslation();
  const { filterUnitsGlobal, isMobile } = useContext(AppContext);
  const filterByCityHandler = (cityId: string) => {
    console.log(cityId);
    filterUnitsGlobal({ sk_city: cityId });
    router.push(`/${locale}/units`);
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 my-4 px-3 mx-auto"
      style={{ height: isMobile ? '70vh' : 'auto' }}
    >
      <div className="py-1 mx-1 md:py-2 md:mx-2">
        <div className={clsx(styles.slideImageContainer)}>
          <h3>{imgs[0].name[locale]}</h3>
          <img src={`/images/${imgs[0].image}`} className="w-full h-full" />
          <button onClick={() => filterByCityHandler(imgs[0]._id)}>Discover destination
            <FontAwesomeIcon icon={faChevronRight} className="ml-2" /> </button>
        </div>
      </div>
      <div className="py-1 mx-1 md:py-2 md:mx-2">
        <div className={clsx(styles.slideImageContainer, styles.halfSlideImageContainer)}>
          <h3>{imgs[1].name[locale]}</h3>
          <img src={`/images/${imgs[1].image}`} className="w-full h-full" />
          <button onClick={() => filterByCityHandler(imgs[1]._id)}>Discover destination <FontAwesomeIcon icon={faChevronRight} className="ml-2" /> </button>
        </div>
        <div className={clsx(styles.slideImageContainer, styles.halfSlideImageContainer)}>
          <h3>{imgs[2].name[locale]}</h3>
          <img src={`/images/${imgs[2].image}`} className="w-full h-full" />
          <button onClick={() => filterByCityHandler(imgs[2]._id)}>Discover destination <FontAwesomeIcon icon={faChevronRight} className="ml-2" /> </button>
        </div>
      </div>
      {!isMobile &&
        <>
          <div className="py-1 mx-1 md:py-2 md:mx-2">
            <div className={clsx(styles.slideImageContainer)}>
              <h3>{imgs[3].name[locale]}</h3>
              <img src={`/images/${imgs[3].image}`} className="w-full h-full" />
              <button onClick={() => filterByCityHandler(imgs[3]._id)}>Discover destination <FontAwesomeIcon icon={faChevronRight} className="ml-2" /> </button>
            </div>
          </div>
          <div className="py-1 mx-1 md:py-2 md:mx-2">
            <div className={clsx(styles.slideImageContainer, styles.halfSlideImageContainer)}>
              <h3>{imgs[4].name[locale]}</h3>
              <img src={`/images/${imgs[4].image}`} className="w-full h-full" />
              <button onClick={() => filterByCityHandler(imgs[4]._id)}>Discover destination <FontAwesomeIcon icon={faChevronRight} className="ml-2" /> </button>
            </div>
            <div className={clsx(styles.slideImageContainer, styles.halfSlideImageContainer)}>
              <h3>{imgs[5].name[locale]}</h3>
              <img src={`/images/${imgs[5].image}`} className="w-full h-full" />
              <button onClick={() => filterByCityHandler(imgs[5]._id)}>Discover destination <FontAwesomeIcon icon={faChevronRight} className="ml-2" /> </button>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default CustomSlide
