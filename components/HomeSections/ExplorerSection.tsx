import React, { useContext } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import CustomSlide from './CustomSlide';
import SearchForm from './SearchForm';
import { AppContext } from './../../Context/AppContextProvider';
import useTranslation from './../../hooks/useTranslation';

const sliderImages = [
  [
    {
      _id: '5f577c3932b94c0067e207d0',
      name: {
        ar: 'هلويبليس الجديدة',
        en: 'new heliopolis'
      },
      image: 'new-alamein.png'
    },
    {
      _id: '5f3a549d8b15b7006d8ad6be',
      name: {
        ar: 'الساحل الشمالي',
        en: 'Sahel'
      },
      image: 'algone.png'
    },

    {
      _id: "5f3a53ed8b15b7006d8ad6bd",
      name: {
        ar: "العين السخنة",
        en: "sokhna city",
      },
      image: 'sokhna.png'
    },
    {
      _id: "5f3a534b8b15b7006d8ad6bc",
      name: {
        ar: "العاصمة الإدارية",
        en: "new capital",
      },
      image: 'new-capital.png'
    },
    {
      _id: '5f3a56418b15b7006d8ad6c1',
      name: {
        ar: 'الشيخ زايد',
        en: 'Sheikh Zayed'
      },
      image: 'zayed.png'
    },
    {
      _id: '5f5a409f581aeb1fb81eaaaa',
      name: {
        ar: 'مدينة نصر',
        en: 'Nasr City'
      },
      image: 'marasi.png'
    },

  ],
  [
    {
      _id: '5f577c3932b94c0067e207d0',
      name: {
        ar: 'هلويبليس الجديدة',
        en: 'new heliopolis'
      },
      image: 'new-alamein.png'
    },
    {
      _id: '5f5a409f581aeb1fb81eaaaa',
      name: {
        ar: 'مدينة نصر',
        en: 'Nasr City'
      },
      image: 'marasi.png'
    },
    {
      _id: "5f3a53ed8b15b7006d8ad6bd",
      name: {
        ar: "العين السخنة",
        en: "sokhna city",
      },
      image: 'sokhna.png'
    },
    {
      _id: "5f3a534b8b15b7006d8ad6bc",
      name: {
        ar: "العاصمة الإدارية",
        en: "new capital",
      },
      image: 'new-capital.png'
    },
    {
      _id: '5f3a56418b15b7006d8ad6c1',
      name: {
        ar: 'الشيخ زايد',
        en: 'Sheikh Zayed'
      },
      image: 'zayed.png'
    },
    {
      _id: '5f3a549d8b15b7006d8ad6be',
      name: {
        ar: 'الساحل الشمالي',
        en: 'Sahel'
      },
      image: 'algone.png'
    },
  ],
  [
    {
      _id: '5f577c3932b94c0067e207d0',
      name: {
        ar: 'هلويبليس الجديدة',
        en: 'new heliopolis'
      },
      image: 'new-alamein.png'
    },
    {
      _id: '5f5a409f581aeb1fb81eaaaa',
      name: {
        ar: 'مدينة نصر',
        en: 'Nasr City'
      },
      image: 'marasi.png'
    },
    {
      _id: "5f3a53ed8b15b7006d8ad6bd",
      name: {
        ar: "العين السخنة",
        en: "sokhna city",
      },
      image: 'sokhna.png'
    },
    {
      _id: "5f3a534b8b15b7006d8ad6bc",
      name: {
        ar: "العاصمة الإدارية",
        en: "new capital",
      },
      image: 'new-capital.png'
    },
    {
      _id: '5f3a56418b15b7006d8ad6c1',
      name: {
        ar: 'الشيخ زايد',
        en: 'Sheikh Zayed'
      },
      image: 'zayed.png'
    },
    {
      _id: '5f3a549d8b15b7006d8ad6be',
      name: {
        ar: 'الساحل الشمالي',
        en: 'Sahel'
      },
      image: 'algone.png'
    },
  ],
  [
    {
      _id: '5f577c3932b94c0067e207d0',
      name: {
        ar: 'هلويبليس الجديدة',
        en: 'new heliopolis'
      },
      image: 'new-alamein.png'
    },
    {
      _id: '5f5a409f581aeb1fb81eaaaa',
      name: {
        ar: 'مدينة نصر',
        en: 'Nasr City'
      },
      image: 'marasi.png'
    },
    {
      _id: "5f3a53ed8b15b7006d8ad6bd",
      name: {
        ar: "العين السخنة",
        en: "sokhna city",
      },
      image: 'sokhna.png'
    },
    {
      _id: "5f3a534b8b15b7006d8ad6bc",
      name: {
        ar: "العاصمة الإدارية",
        en: "new capital",
      },
      image: 'new-capital.png'
    },
    {
      _id: '5f3a56418b15b7006d8ad6c1',
      name: {
        ar: 'الشيخ زايد',
        en: 'Sheikh Zayed'
      },
      image: 'zayed.png'
    },
    {
      _id: '5f3a549d8b15b7006d8ad6be',
      name: {
        ar: 'الساحل الشمالي',
        en: 'Sahel'
      },
      image: 'algone.png'
    },
  ],
  [
    {
      _id: '5f577c3932b94c0067e207d0',
      name: {
        ar: 'هلويبليس الجديدة',
        en: 'new heliopolis'
      },
      image: 'new-alamein.png'
    },
    {
      _id: '5f5a409f581aeb1fb81eaaaa',
      name: {
        ar: 'مدينة نصر',
        en: 'Nasr City'
      },
      image: 'marasi.png'
    },
    {
      _id: "5f3a53ed8b15b7006d8ad6bd",
      name: {
        ar: "العين السخنة",
        en: "sokhna city",
      },
      image: 'sokhna.png'
    },
    {
      _id: "5f3a534b8b15b7006d8ad6bc",
      name: {
        ar: "العاصمة الإدارية",
        en: "new capital",
      },
      image: 'new-capital.png'
    },
    {
      _id: '5f3a56418b15b7006d8ad6c1',
      name: {
        ar: 'الشيخ زايد',
        en: 'Sheikh Zayed'
      },
      image: 'zayed.png'
    },
    {
      _id: '5f3a549d8b15b7006d8ad6be',
      name: {
        ar: 'الساحل الشمالي',
        en: 'Sahel'
      },
      image: 'algone.png'
    },
  ],
]
const ExplorerSection = () => {
  const { isMobile } = useContext(AppContext);
  const { t, locale } = useTranslation()
  return (
    <section>
      <main>
        <h3 className="text-center py-3"><span className="font-comfortaa text-5xl font-semibold">{t('explorerTitle').split(' ')[0]} </span><span className="text-main text-2xl font-semibold">{t('explorerTitle').split(' ')[1]}</span></h3>
        <p className="text-left md:text-center text-sm font-normal px-10">
          {t('explorerHeader')}</p>
      </main>
      <Slide easing="ease-in" transitionDuration={500} arrows={isMobile ? false : true} autoplay={false} >
        {sliderImages.map((imgs, i) => (
          <CustomSlide key={i} imgs={imgs} />
        ))}
      </Slide>
      <div className="my-4">
        <h4 className="text-main text-xl md:text-2xl font-medium text-center py-3">{t('searchAd')} ...</h4>
        <SearchForm placeHolder={t('searchPlaceHolder')} title="explore" />
      </div>


    </section>
  )
}

export default ExplorerSection
