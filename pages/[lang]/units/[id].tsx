import React from "react";

import { getLocalizationProps } from "../../../Context/LangContext";
import { initializeApollo } from "../../../lib/apolloClient";
import useTranslation from "../../../hooks/useTranslation";
import { UNITS_BY_PK } from "../../../query/unitsQuery";
import { GetServerSideProps } from "next";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import InteriorFeatures from './../../../components/Units/SingleUnit/InteriorFeatures';
import DaysMarket from './../../../components/Units/SingleUnit/DaysMarket';
import SimilarUnits from './../../../components/Units/SingleUnit/SimilarUnits';
import SingleUnitHeroSection from './../../../components/Units/SingleUnit/SingleUnitHeroSection';
import BreadCrumbs from './../../../components/Units/SingleUnit/BreadCrumbs';
import {
  Layout,
  UnitInformation,
  FloorPlan,
  FinancialAnalysis
} from "./../../../components/exports";
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
  // const { t, locale } = useTranslation();

  return (
    <Layout>
      <BreadCrumbs unit={unit} />
      <div className="container px-3 mx-auto">
        <SingleUnitHeroSection unit={unit} />
        {/* Unit Information */}
        <UnitInformation unit={unit} />
        {/* financial analysis */}
        <FinancialAnalysis unit={unit} />
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
            defaultCenter={{ lat: unit.lat, lng: unit.lng }}
          />
        </div>
        {/* floor plan */}
        <FloorPlan unit={unit} />
        {/* interior features */}
        <InteriorFeatures unit={unit} />
        {/* days on the market */}
        <DaysMarket />
        {/* similar units */}
        <SimilarUnits units={unit?.compound?.units} />
      </div>
    </Layout>
  );
};

/*
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
  const localization = getLocalizationProps(ctx, "common");
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
  units.forEach((unit: any) => {
    paths.push({ params: { lang: "ar", id: unit.id } });
    paths.push({ params: { lang: "en", id: unit.id } });
  });
  return {
    paths,
    fallback: false,
  };
};
*/

export const getServerSideProps: GetServerSideProps = async (context) => {
  let unitId = context.params?.id;
  const client = initializeApollo();
  const resp = await client.query({
    query: UNITS_BY_PK,
    variables: {
      id: unitId,
    },
  });
  const unit: any = resp?.data.units_by_pk;
  const localization = getLocalizationProps(context, "common");
  return {
    props: {
      localization,
      unit,
    },
  };
};
export default SingleUnit;
