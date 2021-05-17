import React from 'react'
import clsx from 'clsx'
import styles from './homeStyles.module.scss'
interface Slide {
  title: string;
  image: string;
}
const CustomSlide = ({ imgs }: { imgs: Slide[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-1 gap-4 my-4 px-3 mx-auto">
      <div className="py-2 mx-2">
        <div className={clsx(styles.slideImageContainer)}>
          <h3>{imgs[0].title}</h3>
          <img src={`/images/${imgs[0].image}`} className="w-full h-full" />
          <button>Discover destination <i className="fa fa-chevron-right" aria-hidden="true" /> </button>
        </div>
      </div>
      <div className="py-2 mx-2">
        <div className={clsx(styles.slideImageContainer, styles.halfSlideImageContainer)}>
          <h3>{imgs[1].title}</h3>
          <img src={`/images/${imgs[1].image}`} className="w-full h-full" />
          <button>Discover destination <i className="fa fa-chevron-right" aria-hidden="true" />> </button>
        </div>
        <div className={clsx(styles.slideImageContainer, styles.halfSlideImageContainer)}>
          <h3>{imgs[2].title}</h3>
          <img src={`/images/${imgs[2].image}`} className="w-full h-full" />
          <button>Discover destination <i className="fa fa-chevron-right" aria-hidden="true" /> </button>
        </div>
      </div>
      <div className="py-2 mx-2">
        <div className={clsx(styles.slideImageContainer)}>
          <h3>{imgs[3].title}</h3>
          <img src={`/images/${imgs[3].image}`} className="w-full h-full" />
          <button>Discover destination <i className="fa fa-chevron-right" aria-hidden="true" /> </button>
        </div>
      </div>
      <div className="py-2 mx-2">
        <div className={clsx(styles.slideImageContainer, styles.halfSlideImageContainer)}>
          <h3>{imgs[4].title}</h3>
          <img src={`/images/${imgs[4].image}`} className="w-full h-full" />
          <button>Discover destination <i className="fa fa-chevron-right" aria-hidden="true" /> </button>
        </div>
        <div className={clsx(styles.slideImageContainer, styles.halfSlideImageContainer)}>
          <h3>{imgs[5].title}</h3>
          <img src={`/images/${imgs[5].image}`} className="w-full h-full" />
          <button>Discover destination <i className="fa fa-chevron-right" aria-hidden="true" /> </button>
        </div>
      </div>
    </div>
  )
}

export default CustomSlide
