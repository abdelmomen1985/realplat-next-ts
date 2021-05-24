import React, { useContext } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import styles from './offerSections.module.scss'
import { AppContext } from './../../../Context/AppContextProvider';

const HeroOfferSection = ({ unit }: { unit: any }) => {
  const { isMobile } = useContext(AppContext)
  return (
    <section className="w-full p-0 m-0 mb-5 relative">
      <Slide easing="ease-in" transitionDuration={500}
        autoplay={false}
        indicators={isMobile ? false : true}
        arrows={false}>
        {unit.projectImages.map((img, i) => (
          <div key={i} className={styles.eachSlide}>
            <div style={{ 'backgroundImage': `url(${img})`, backgroundPosition: 'center', backgroundRepeat: 'none', backgroundSize: 'cover' }}>
            </div>
          </div>
        ))}
      </Slide>
      <div className="flex justify-center items-start">
        <div className="">
          <img className={styles.logoImg} src={unit.projectDeveloperLogo} />
        </div>
        <div className="mt-0 mb-4 mx-3 py-3 px-2">
          <h3 className="font-semibold  text-xl md:text-3xl text-black mt-2 mb-3">
            {unit.projectName}
          </h3>
          <h5 className="font-normal text-base md:text-lg text-black ">
            Prices From {unit.startingPrice}
          </h5>
          <div className="flex flex-wrap justify-start md:justify-between items-center">
            <button className="btn-primary m-0 my-2 md:mr-2">Book Now</button>
            <button className="btn-outline-primary m-0 my-2 md:ml-2">Zoom Meeting</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroOfferSection
