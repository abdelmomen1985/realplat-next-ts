import React, { useState } from 'react'
import CustomModal from '../../common/CustomModal/CustomModal'
import useTranslation from './../../../hooks/useTranslation';
import clsx from 'clsx';

const MainOffersSection = () => {
  const [showModal, setShowModal] = useState<number>(0)
  const { t, locale } = useTranslation()
  const services = [
    {
      img: '/images/booking.png',
      title: {
        en: 'booking',
        ar: "حجز"
      }
    },
    {
      img: '/images/refund.png',
      title: {
        en: 'refund',
        ar: "إعادة تمويل"
      }
    },
    {
      img: '/images/faq.png',
      title: {
        en: 'FAQ',
        ar: "تعليمات"
      }
    },
  ]
  return (
    <section className="bg-secondary grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-8 justify-center items-center py-10 px-5 mb-0 mt-0">
      <div className={clsx(locale === 'en' ? "md:ml-24 md:mr-5" : "md:mr-24 md:ml-5")}>
        <h4 className="text-3xl font-normal text-black text-opacity-50">{t('welcomeTo')}..</h4>
        <h2 className="text-5xl font-bold text-custom-blue-dark">{t('mellwExpo')}</h2>
        <p className="text-lg text-black text-opacity-50">{t('guideHeader')}</p>
        <button
          className="bg-primary text-white text-md mt-5 mb-2 font-medium rounded-3xl px-12 py-3 shadow-md mx-auto ">
          {t('contactBtn')}</button>
      </div>
      <div className={clsx(locale === "en" ? "md:mr-10 md:ml-24" : "md:ml-10 md:mr-24", "w-full")}>
        <div className="flex justify-center items-center py-3 w-full md:w-2/4 px-2 bg-gray-400 ">
          <img src="/images/timer.png" className={clsx(locale === 'en' ? "mr-1" : 'ml-1')} />
          <div>
            <h4 className="text-xl text-black text-opacity-50">{t('offerTo')}..</h4>
            <h3 className="text-2xl font-semibold text-custom-blue-light">02:32</h3>
          </div>
        </div>
        <div className="my-2">
          {
            services.map((service, i) => (
              <div key={i} className="flex justify-start  items-center my-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowModal(i + 1) }}>
                <img src={service.img} className={locale === 'en' ? "mr-2" : 'ml-2'} />
                <h5 className="text-xl font-semibold capitalize text-custom-blue-light ">{service.title[locale]}</h5>
              </div>
            ))
          }
        </div>

      </div>
      <CustomModal show={showModal === 1} onClose={() => setShowModal(0)}>
        <h3>Let's Talk about Budget management</h3>
      </CustomModal>
      <CustomModal show={showModal === 2} onClose={() => setShowModal(0)}>
        <h3>Let's Talk about Finding the Best Deals</h3>
      </CustomModal>
      <CustomModal show={showModal === 3} onClose={() => setShowModal(0)}>
        <h3>Let's Talk about How to book your unit online</h3>
      </CustomModal>
    </section>
  )
}

export default MainOffersSection
