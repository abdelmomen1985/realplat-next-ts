import React from "react";

import { getLocalizationProps } from "../../../Context/LangContext";
import { initializeApollo } from "../../../lib/apolloClient";
import useTranslation from "../../../hooks/useTranslation";
import Carousel from "react-elastic-carousel";
import { UNITS_BY_PK } from "../../../query/unitsQuery";
import { GetServerSideProps } from "next";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import {
  FinancialSummary,
  Header,
  Layout,
  UnitInformation,
  DeliveryDetails,
  FinancialAnalysis,
  UnitDescription,
  FloorPlan,
  CompoundNdDeveloper,
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
  const { t, locale } = useTranslation();

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
                    style={{ maxHeight: "250px" }}
                    src={image}
                    alt="unit image"
                  />
                );
              })}
            </Carousel>
            {/* Unit Information */}
            <UnitInformation unit={unit} />
            {/* delivery details */}
            <DeliveryDetails unit={unit} />
            {/* financial analysis */}
            <FinancialAnalysis unit={unit} />
            {/* unit description */}
            <UnitDescription unit={unit} />
            {/* location */}
            <div className="my-3">
              {/* map api that recieves lat and lang */}
              <h3
                style={{
                  width: "100%",
                  textAlign: locale === "en" ? "left" : "right",
                  background: "rgba(149,165,166, 0.5)",
                  color: "rgb(44,62,80)",
                  fontSize: "20px",
                  fontWeight: "bold",
                  padding: "5px 10px",
                  margin: "15px 3px",
                }}
              >
                {t("location")}
              </h3>
              <RegularMap
                googleMapURL="https://maps.googleapis.com/maps/api/js"
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "280px" }} />}
                mapElement={<div style={{ height: "100%" }} />}
                defaultCenter={{ lat: unit.lat, lng: unit.lng }}
              />
            </div>
            {/* floor plan */}
            <FloorPlan unit={unit} />
            {/* compound & developer */}
            <CompoundNdDeveloper unit={unit} />
          </div>
          {/* financial summary */}
          <FinancialSummary unit={unit} />
        </div>
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
