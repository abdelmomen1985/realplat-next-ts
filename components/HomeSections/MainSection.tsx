import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import useTranslation from './../../hooks/useTranslation';
import clsx from 'clsx'
import styles from './homeStyles.module.scss';
import SearchForm from './SearchForm';
import { AppContext } from './../../Context/AppContextProvider';

const suggestedCities = [
  {
    _id: "5f3a53188b15b7006d8ad6bb",
    name: {
      ar: "القاهرة الجديدة",
      en: 'new cairo',
    },
  },
  {
    _id: "5f3a549d8b15b7006d8ad6be",
    name: {
      ar: "الساحل الشمالي",
      en: 'sahel',
    }
  },
  {
    _id: '5f3a534b8b15b7006d8ad6bc',
    name: {
      ar: "العاصمة الإدارية",
      en: 'new capital'
    }
  },
  {
    _id: "5f3a55388b15b7006d8ad6c0",
    name: {
      ar: "مدينة ٦ أكتوبر",
      en: '6th october',
    }
  },
  {
    _id: "5f3a53ed8b15b7006d8ad6bd",
    name: {
      ar: "العين السخنة",
      en: 'sokhna city'
    }
  },

]
const MainSection = () => {
  const router = useRouter()
  const { locale } = useTranslation();
  const { filterUnitsByCity } = useContext(AppContext)
  const filterByCityHandler = (cityId: string) => {
    console.log(cityId)
    filterUnitsByCity(cityId)
    router.push(`/${locale}/units`)
  }
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
          {suggestedCities.map((city) => (
            <p className={styles.city} onClick={() => filterByCityHandler(city._id)} key={city._id}>{city.name[locale]}</p>
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
