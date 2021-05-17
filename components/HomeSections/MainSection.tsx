import React from 'react'
import Link from 'next/link';
import useTranslation from './../../hooks/useTranslation';
import clsx from 'clsx'
import styles from './homeStyles.module.scss';
import SearchForm from './SearchForm';

const suggestedCitites = ['new cairo', 'sahel', 'new capital', '6th october', 'sokhna city']
const MainSection = () => {
  // const { t, locale } = useTranslation();

  return (
    <>
      <section
        className="flex flex-wrap flex-col bg-local pt-20 items-center justify-center mx-3 rounded-2xl"
        style={{
          background: 'url(/images/hp-hero-desktop.png) no-repeat 50% fixed',
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        <h2 className="text-3xl md:text-6xl text-center text-white py-3  font-medium"
          style={{ textShadow: '4px 4px 5px rgba(0,0,0,0.5)' }}
        >
          <span>Discover a place</span>
          <br />
          <span>you'll love to live</span>
        </h2>
        <SearchForm placeHolder="Search our listed units" title="main" />

        <div className="flex flex-wrap justify-center md:justify-between text-center items-center my-3">
          <h3 className="text-white text-xl md:text-3xl font-medium mx-1"

          >
            Search our listed units with ease
          </h3>
          <button className={clsx(styles.hoverBtn, "bg-primary shadow-md rounded-md  py-1 px-4 font-medium mx-1  text-white capitalize")}
          >Learn More</button>
        </div>
        <div className="flex flex-wrap w-4/5 justify-between my-5 items-center">
          {suggestedCitites.map((city, i) => (
            <p className={styles.city} key={i}>{city}</p>
          ))}
        </div>
      </section>
      <section className="w-full my-8">
        <div className="w-4/5 mx-auto rounded-md shadow-md flex justify-center items-center py-3 px-5">
          <h3 className="flex justify-center items-center">
            <i className="fas fa-heart text-custom-red mx-2 text-4xl" aria-hidden="true"></i>
            <span>Take a deep dive and browse original <br /> neighborhood photos, drone footage</span>
          </h3>
          <button className="bg-transparent underline cursor-pointer text-primary capitalize mx-2">Learn More</button>
        </div>
      </section>
    </>
  )
}

export default MainSection
