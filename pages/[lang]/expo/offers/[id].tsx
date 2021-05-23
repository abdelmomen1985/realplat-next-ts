import React, { useState } from 'react'
import { GetServerSideProps } from 'next';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { getLocalizationProps } from './../../../../Context/LangContext';
import Layout from './../../../../components/Layouts/Layout';
import FinancialAnalysis from './../../../../components/Units/SingleUnit/FinancialAnalysis';
import UnitInformation from './../../../../components/Units/SingleUnit/UnitInformation';
import MainOffersSection from './../../../../components/ExpoSections/OffersSections/MainOffersSection';
import HeroOfferSection from '../../../../components/ExpoSections/OffersSections/HeroOfferSection';




const offersList: any[] = [
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Azadir - New Cairo',
    projectImages: [
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png'],

    projectDeveloperLogo: '/images/oud-small.png',
    startingPrice: '1,089,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Next Point - Maadi',
    projectImages: [
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png'
    ],

    projectDeveloperLogo: '/images/nextHome.png',
    startingPrice: '889,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Azadir - New Cairo',
    projectImages: [
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png'

    ],

    projectDeveloperLogo: '/images/palmhills-small.png',
    startingPrice: '1,089,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Azadir - New Cairo',
    projectImages: [
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png'],

    projectDeveloperLogo: '/images/oud-small.png',
    startingPrice: '1,089,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Azadir - New Cairo',
    projectImages: [
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png'

    ],

    projectDeveloperLogo: '/images/palmhills-small.png',
    startingPrice: '1,089,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Next Point - Maadi',
    projectImages: [
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png'

    ],

    projectDeveloperLogo: '/images/nextHome.png',
    startingPrice: '889,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Azadir - New Cairo',
    projectImages: [
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png'],

    projectDeveloperLogo: '/images/oud-small.png',
    startingPrice: '1,089,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Next Point - Maadi',
    projectImages: [
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png'

    ],

    projectDeveloperLogo: '/images/nextHome.png',
    startingPrice: '889,000',
    discountPer: '5'
  },
  {
    id: (((1 + Math.random()) * 0x10000000000000) | 0).toString(32),
    projectName: 'Azadir - New Cairo',
    projectImages: [
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png',
      '/images/hero/singleOffer-hero.png'
    ],
    projectDeveloperLogo: '/images/palmhills-small.png',
    startingPrice: '1,089,000',
    discountPer: '5'
  },
]
let currentIndex = Math.floor(Math.random() * (offersList.length - 1) + 1)
const singleUnit = {
  ...offersList[currentIndex],
  bathrooms: 1,
  bedrooms: 1,
  bua: 70,
  compound: {
    name: { ar: "دي جويا *", en: "De Joya" }
  },
  delivery_month: 12,
  delivery_year: 2022,
  description: 'Lovely 4 BR, 2 Bath home with Vaulted Ceilings, Open Concept Kitchen & Family Room, Solid Flooring throughout (tumbled Travertine everywhere except BRs which are Wood floors). 4th BR has a closet & double door entry, which makes it a nice option as a Den/Office. Updated Kitchen is open to the Family Room, w/Slab Granite counters & an Island, SS appliances. Wood shutters on many windows. The Master BR has a fully remodeled en suite Master Bath w/ large closet, big walk-in shower & separate toilet room. Both Baths have granite counters.',
  fin_total: 700000,
  fin_years: 10,
  land: 70,
  lat: 29.956188,
  lng: 31.770838,
  property_type: {
    name: {
      en: 'villa',
      ar: 'فيلا'
    }
  },
  npv: 376259




}
const defaultOptions = { scrollwheel: false };
const RegularMap = withScriptjs(
  withGoogleMap((props: any) => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={props.defaultCenter}
      defaultOptions={defaultOptions}
    >
      <Marker position={props.defaultCenter} />
    </GoogleMap>
  ))
);
const SingleOffer = () => {
  const [singleUnitState, setSingleUnitState] = useState(singleUnit);
  console.log(singleUnit)
  return (
    <Layout title="Expo Page">
      <MainOffersSection />
      <HeroOfferSection unit={singleUnitState} />
      <div className="container px-3 mx-auto">
        {/* Unit Information */}
        <UnitInformation unit={singleUnitState} />
        {/* financial analysis */}
        <FinancialAnalysis unit={singleUnitState} />
        {/* location */}
        <div className="my-3 border-gray-300 rounded-md shadow-md">
          {/* map api that recieves lat and lang */}
          <h3 className="mb-3 py-4 w-100 px-5 text-text-secondary rounded-md flex justify-start items-center"
            style={{ backgroundColor: '#F5F6F7' }}
          >
            <img src="/images/location.png" />
            <span className="text-2xl font-medium mx-4 capitalize">Location</span>
          </h3>
          <RegularMap
            googleMapURL="https://maps.googleapis.com/maps/api/js"
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "280px", margin: '10px' }} />}
            mapElement={<div style={{
              height: "95%", borderRadius: '15px'
            }} />}
            defaultCenter={{ lat: singleUnitState.lat, lng: singleUnitState.lng }}
          />
        </div>
      </div>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  // let unitId = context.params?.id;
  // const client = initializeApollo();
  // const resp = await client.query({
  //   query: UNITS_BY_PK,
  //   variables: {
  //     id: unitId,
  //   },
  // });
  // const unit: any = resp?.data.units_by_pk;
  const localization = getLocalizationProps(context, "common");
  return {
    props: {
      localization,
      // unit,
    },
  };
};
export default SingleOffer

