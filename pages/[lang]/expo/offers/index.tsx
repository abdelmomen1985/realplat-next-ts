import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getLocalizationProps } from './../../../../Context/LangContext';
import Layout from './../../../../components/Layouts/Layout';
import MainOffersSection from './../../../../components/ExpoSections/OffersSections/MainOffersSection';
import { Offer } from '../../../../interfaces';
import OfferCard from '../../../../components/ExpoSections/OffersSections/OfferCard';

const offersList: Offer[] = [
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Azadir - New Cairo',
    projectImage: '/images/comp1.png',
    projectDeveloperLogo: '/images/oud-small.png',
    startingPrice: '1,089,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Next Point - Maadi',
    projectImage: '/images/comp2.png',
    projectDeveloperLogo: '/images/nextHome.png',
    startingPrice: '889,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Azadir - New Cairo',
    projectImage: '/images/comp3.png',
    projectDeveloperLogo: '/images/palmhills-small.png',
    startingPrice: '1,089,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Azadir - New Cairo',
    projectImage: '/images/comp1.png',
    projectDeveloperLogo: '/images/oud-small.png',
    startingPrice: '1,089,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Azadir - New Cairo',
    projectImage: '/images/comp3.png',
    projectDeveloperLogo: '/images/palmhills-small.png',
    startingPrice: '1,089,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Next Point - Maadi',
    projectImage: '/images/comp2.png',
    projectDeveloperLogo: '/images/nextHome.png',
    startingPrice: '889,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Azadir - New Cairo',
    projectImage: '/images/comp1.png',
    projectDeveloperLogo: '/images/oud-small.png',
    startingPrice: '1,089,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Next Point - Maadi',
    projectImage: '/images/comp2.png',
    projectDeveloperLogo: '/images/nextHome.png',
    startingPrice: '889,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Azadir - New Cairo',
    projectImage: '/images/comp3.png',
    projectDeveloperLogo: '/images/palmhills-small.png',
    startingPrice: '1,089,000',
    discountPer: '5'
  },
]
const ExpoOffers = () => {
  const [offersState, setOffersState] = useState<Offer[]>(offersList)
  return (
    <Layout title="Expo Page">
      <MainOffersSection />
      <section className="my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center justify-center items-center">
          {offersState.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default ExpoOffers;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const localization = getLocalizationProps(ctx, "common");
  return {
    props: {
      localization,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["en", "ar"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
