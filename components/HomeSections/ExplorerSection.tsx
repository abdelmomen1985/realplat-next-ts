import React, { useContext } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import CustomSlide from './CustomSlide';
import SearchForm from './SearchForm';
import { AppContext } from './../../Context/AppContextProvider';

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
  return (
    <section>
      <main>
        <h3 className="text-center py-3"><span className="font-comfortaa text-5xl font-semibold">mellw </span><span className="text-main text-2xl font-semibold">Explorer</span></h3>
        <p className="text-left md:text-center text-sm font-normal px-10">Take a deep dive and browse original neighborhood photos, drone footage,<br /> resident reviews and local insights to see if the homes for sale are right for you.</p>
      </main>
      <Slide easing="ease-in" transitionDuration={500} arrows={isMobile ? false : true} autoplay={false} >
        {sliderImages.map((imgs, i) => (
          <CustomSlide key={i} imgs={imgs} />
        ))}
      </Slide>
      <div className="my-4">
        <h4 className="text-main text-xl md:text-2xl font-medium text-center py-3">Searching for a particular destination ...</h4>
        <SearchForm placeHolder="Search our listed units" title="explore" />
      </div>


    </section>
  )
}

export default ExplorerSection
