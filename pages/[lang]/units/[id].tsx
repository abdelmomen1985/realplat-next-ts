import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getLocalizationProps } from '../../../Context/LangContext';
import { initializeApollo } from '../../../lib/apolloClient';
import useTranslation from '../../../hooks/useTranslation';
import Carousel from 'react-elastic-carousel';
import Link from 'next/link';
import Layout from '../../../components/Layouts/Layout';
import Header from '../../../components/Layouts/Header';
import { FULL_UNITS, UNITS_BY_PK } from '../../../query/unitsQuery';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
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

const SingleUnit = ({ unit }: { unit: any }) => {
  const { locale } = useTranslation();

  return (
    <Layout>
      <Header />
      <div className="container px-3 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Carousel
              pagination={false}
              showArrows={false}
              enableAutoPlay={true}
              autoPlaySpeed={1000}
            >
              {unit.media.photos.map((image: any, key: any) => {
                return (
                  <img
                    key={key}
                    className="w-full"
                    style={{ maxHeight: '250px' }}
                    src={image}
                    alt="unit image"
                  />
                );
              })}
            </Carousel>
            {/* Unit Information */}
            <div className="px-5 py-3">
              <h3
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'rgba(149,165,166, 0.5)',
                  color: 'rgb(44,62,80)',
                  fontSize: '20px',
                  fontWeight: '600',
                  padding: '15px 10px',
                  margin: '15px 3px',
                }}
              >
                Unit Information
              </h3>
              <div className="flex flex-wrap justify-between py-3 px-2">
                <div>
                  <h5 className="capitalize">
                    <span className="text-indigo-800 font-bold">
                      <i className="fas fa-home"></i> Unit Type
                    </span>
                    : {unit.property_type.name[locale]}
                  </h5>
                </div>
              </div>
              <div className="flex flex-wrap justify-between py-3 px-2">
                <div>
                  <h5 className="capitalize">
                    <span className="text-indigo-800 font-bold">
                      <i className="fas fa-home"></i> Land Area
                    </span>
                    : {unit.land} M2
                  </h5>
                </div>
                <div>
                  <h5 className="capitalize">
                    <span className="text-indigo-800 font-bold">
                      <i className="fas fa-home"></i> BuiltUpArea
                    </span>
                    : {unit.bua} M2
                  </h5>
                </div>
              </div>
              <div className="flex flex-wrap justify-between py-3 px-2">
                <div>
                  <h5 className="capitalize">
                    <span className="text-indigo-800 font-bold">
                      <i className="fas fa-home"></i> Bedrooms
                    </span>
                    : {unit.bedrooms}
                  </h5>
                </div>
                <div>
                  <h5 className="capitalize">
                    <span className="text-indigo-800 font-bold">
                      <i className="fas fa-home"></i> Bathrooms
                    </span>
                    : {unit.bathrooms}
                  </h5>
                </div>
              </div>
            </div>
            {/* delivery details */}
            <h3
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'rgba(149,165,166, 0.5)',
                color: 'rgb(44,62,80)',
                fontSize: '20px',
                fontWeight: '600',
                padding: '5px 10px',
                margin: '15px 3px',
              }}
            >
              Delivery Details
            </h3>
            <div className="flex flex-wrap justify-around">
              <div className="bg-indigo-800 rounded-md text-white text-lg text-center px-3 py-1 my-3 font-bold">
                <i className="fas fa-home"></i> {unit.finishing_type}
              </div>
              <div className="border border-indigo-800 rounded-md text-lg text-center text-indigo-800 px-3 py-1 my-3 font-bold">
                <i className="fas fa-calendar"></i> Delivered in{' '}
                {unit.delivery_year}
              </div>
            </div>
            {/* financial analysis */}
            <div>
              <h3
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'rgba(149,165,166, 0.5)',
                  color: 'rgb(44,62,80)',
                  fontSize: '20px',
                  fontWeight: '600',
                  padding: '5px 10px',
                  margin: '15px 3px',
                }}
              >
                Financial Analysis
              </h3>
              <div className="flex flex-wrap">
                <div className="flex flex-wrap px-2 border-r-2">
                  <div className="border rounded-md p-3 text-center">
                    <p>Total Price</p>
                    <h5>{unit.fin_total}</h5> $
                  </div>
                  <div className="text-indigo-800 font-black text-2xl flex items-center">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                  <div className="border rounded-md p-3 text-center border-indigo-800">
                    <p>Price Per Square Meter</p>
                    <h5 className="font-bold">
                      {(unit.fin_total / unit.land).toFixed()} $
                    </h5>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="border rounded-md p-3 text-center">
                    <p>NPV</p>
                    <h5>{unit.npv}</h5> $
                  </div>
                  <div className="text-indigo-800 font-black text-2xl flex items-center">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                  <div className="border rounded-md p-3 text-center border-indigo-800">
                    <p>NPV Per Square Meter</p>
                    <h5 className="font-bold">
                      {(unit.npv / unit.land).toFixed()} $
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            {/* unit description */}
            {unit.description && (
              <div>
                <h3
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'rgba(149,165,166, 0.5)',
                    color: 'rgb(44,62,80)',
                    fontSize: '20px',
                    fontWeight: '600',
                    padding: '5px 10px',
                    margin: '15px 3px',
                  }}
                >
                  About the property
                </h3>
                <p>{unit.description}</p>
              </div>
            )}

            {/* location */}
            <div className="my-3">
              {/* map api that recieves lat and lang */}
              <h3
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'rgba(149,165,166, 0.5)',
                  color: 'rgb(44,62,80)',
                  fontSize: '20px',
                  fontWeight: '600',
                  padding: '5px 10px',
                  margin: '15px 3px',
                }}
              >
                Location
              </h3>
              <RegularMap
                googleMapURL="https://maps.googleapis.com/maps/api/js"
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '280px' }} />}
                mapElement={<div style={{ height: '100%' }} />}
                defaultCenter={{ lat: unit.lat, lng: unit.lng }}
              />
            </div>
            {/* floor plan */}
            <div>
              <h3
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'rgba(149,165,166, 0.5)',
                  color: 'rgb(44,62,80)',
                  fontSize: '20px',
                  fontWeight: '600',
                  padding: '5px 10px',
                  margin: '15px 3px',
                }}
              >
                Floor Plan
              </h3>
              <img src={unit.media.floor_plan} className="w-full" />
            </div>
            <div className="flex flex-wrap">
              <div className="my-5 bg-blue-100 text-white p-5 mx-5 shadow-md rounded-md">
                <img
                  src={unit.compound.media.card_icon}
                  style={{
                    width: '100px',
                    display: 'block',
                    margin: '10px auto',
                  }}
                />
                <Link
                  href={`/${locale}/compounds/[compound]`}
                  as={`/${locale}` + '/compounds/' + unit.compound.id}
                >
                  <a className="my-2 mx-auto w-11/12 rounded-md text-indigo-800 bg-indigo-300 font-bold text-lg block text-center py-3 px-3 mb-3">
                    {' '}
                    See ALL Units in Project &rarr;
                  </a>
                </Link>
              </div>
              <div className="my-5 bg-blue-100 text-white p-5 mx-5 shadow-md rounded-md">
                <img
                  src={unit.compound.developer.media.card_icon}
                  style={{
                    width: '100px',
                    display: 'block',
                    margin: '10px auto',
                  }}
                />
                <Link
                  href={`/${locale}/developers/[developer]`}
                  as={
                    `/${locale}` + '/developers/' + unit.compound.developer.id
                  }
                >
                  <a className="my-2 mx-auto w-11/12 rounded-md text-indigo-800 bg-indigo-300 font-bold text-lg block text-center py-3 px-3 mb-3">
                    {' '}
                    See ALL Projects By Developer &rarr;
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div
              className="relative md:fixed w-full md:w-2/6  rounded-md shadow-xl"
              style={{ top: '15%', right: '0.75rem' }} // handle responsive
            >
              <div className="bg-indigo-800 text-white shadow-xl">
                <div className="my-5 py-3 px-4">
                  <h5>Down Payment</h5>
                  <h3 className="font-bold text-2xl">
                    {unit.fin_down_payment} $
                  </h3>
                </div>
                <div className="my-5 py-3 px-4">
                  <h5>Monthly Payment</h5>
                  <h3 className="font-bold text-2xl">
                    {unit.fin_monthly_payment}
                  </h3>
                </div>
                <div className="my-5 py-3 px-4">
                  <h5>Duration</h5>
                  <h3 className="font-bold text-2xl">{unit.fin_years}</h3>
                </div>
              </div>
              <div className="flex flex-wrap py-2 justify-between mx-auto px-3 ">
                <button className="bg-indigo-800 text-white rounded-sm py-3 px-5 font-bold text-xl">
                  Contact Sales
                </button>
                <button className="border border-indigo-800 font-bold text-xl text-indigo-800 rounded-sm py-3 px-10">
                  <i className="fas fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  let unitId = ctx.params?.id;
  const client = initializeApollo();
  const resp = await client.query({
    query: UNITS_BY_PK,
    variables: {
      id: unitId,
    },
  });
  const unit: any = resp?.data.units_by_pk;
  const localization = getLocalizationProps(ctx, 'common');
  return {
    props: {
      localization,
      unit,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo();
  const resp = await client.query({ query: FULL_UNITS });
  const units: any = resp?.data.units;
  const paths: any[] = [];
  units.forEach((unit) => {
    paths.push({ params: { lang: 'ar', id: unit.id } });
    paths.push({ params: { lang: 'en', id: unit.id } });
  });
  return {
    paths,
    fallback: false,
  };
};
export default SingleUnit;
