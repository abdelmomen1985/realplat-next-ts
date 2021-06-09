import React from 'react'
import useTranslation from './../../hooks/useTranslation';
import clsx from 'clsx'
const guides = [
  {
    img: '/images/works1.png',
    title: {
      en: 'Suits your needs',
      ar: "مناسب لاحتياجاتك"
    },
    link: {
      en: 'Define your budget and destination.',
      ar: "قم بتحديد ميزانيتك ووجهتك المفضلة"
    }
  },
  {
    img: '/images/works2.png',
    title: {
      en: 'Find Deals',
      ar: "احصل على عروض"
    },
    link: {
      en: 'Find a suitable deals based on your needs.',
      ar: "احصل على عروض مناسبة لاحتياجاتك"
    }
  },
  {
    img: '/images/works3.png',
    title: {
      en: 'Book Online',
      ar: "احجز عن طريق الانترنت"
    },
    link: {
      en: 'Book your unit online, it’s 100% refundable',
      ar: "احجز وحدتك السكنية من خلال الانترنت، يمكنك طلب استرداد اموالك بالكامل"
    }
  },
]

const HowWorksSection = () => {
  const { t, locale } = useTranslation()
  return (
    <section className="my-3 w-full relative py-5 bg-secondary">
      <div
        className="w-full lg:w-2/3 my-8 py-7  mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-10">
        <div className={clsx(locale === 'en' ? "mr-3" : 'ml-3', "mt-2")}>
          <h3 className="text-main text-2xl font-bold my-4 text-custom-blue-dark"
          >{t('howWorks')}</h3>
          <p className="font-comfortaa text-black text-opacity-50">
            {t('guideHeader')}
          </p>
          <button
            className="bg-primary text-white text-base mt-5 mb-2 font-medium rounded-2xl w-3/4  px-12 py-3 shadow-md mx-auto ">
            {t('contactBtn')}</button>
        </div>
        <div className={clsx("my-4", locale === 'en' ? "ml-3" : 'mr-3')}>
          {guides.map((guide, i) =>
          (
            <div key={i} className="flex justify-start items-center mb-5">
              <img className="w-16 h-12" src={guide.img} />
              <div className={locale === 'en' ? "ml-3" : 'mr-3'}>
                <h4 className="font-semibold text-2xl text-custom-blue-dark cursor-pointer">{guide.title[locale]}</h4>
                <p className="text-xl font-medium text-text-secondary">{guide.link[locale]} </p>
              </div>
            </div>
          ))}
        </div>
      </div>


    </section>
  )
}

export default HowWorksSection
