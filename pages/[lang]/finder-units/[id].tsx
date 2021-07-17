import { GetServerSideProps } from "next";
import React from "react";
import { getLocalizationProps } from "../../../Context/LangContext";

import Link from "next/link";
import { Unit } from "../../../interfaces";
import useTranslation from "../../../hooks/useTranslation";
import { UNITS_BY_PK } from "../../../query/unitsQuery";
import { initializeApollo } from "../../../lib/apolloClient";
import FinderLayout from "../../../components/Layouts/FinderLayout";
import FinderBreadCrumbs from "../../../components/FinderComponents/FinderPropertySections/FinderBreadCrumbs";
import FinderSingleUnitHero from "../../../components/FinderComponents/FinderPropertySections/FinderSingleUnitHero";
import FinderOverview from "../../../components/FinderComponents/FinderPropertySections/FinderOverview";
import FinderPropDetails from "../../../components/FinderComponents/FinderPropertySections/FinderPropDetails";
import FinderPropAmenities from "../../../components/FinderComponents/FinderPropertySections/FinderPropAmenities";
import FinderPropRequest from "../../../components/FinderComponents/FinderPropertySections/FinderPropRequest/FinderPropRequest";
import FinderPropLocation from "../../../components/FinderComponents/FinderPropertySections/FinderPropLocation";
import FinderSimilarUnits from "./../../../components/FinderComponents/FinderPropertySections/FinderSimilarUnits";
import clsx from "clsx";
import styles from "../../../components/FinderComponents/FinderPropertySections/finder-prop.module.scss";
const SingleExpoPage = ({ unit }: { unit: Unit }) => {
  const { t } = useTranslation();

  return (
    <FinderLayout>
      <div className={clsx(styles.finderExpo)}>
        <FinderBreadCrumbs unit={unit} />
        <FinderSingleUnitHero unit={unit} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 mx-2 md:mx-0">
          <div className="col-span-1 md:col-span-2">
            <div className="flex justify-start items-center ">
              <span className="bg-success capitalize text-white px-3 py-1 rounded border-transparent">
                verified
              </span>
              <span className="bg-info mx-2 capitalize text-white px-3 py-1 rounded border-transparent">
                New
              </span>
            </div>
            <h3 className="my-4">
              <span className="text-2xl font-bold text-black">
                {t("egp")}
                {unit?.fin_monthly_payment}
              </span>
              <span className="mx-1 text-base font-normal text-gray-700">
                / month
              </span>
            </h3>
            <hr className="w-11/12 my-4" />
            <FinderOverview unit={unit} />
            <FinderPropDetails unit={unit} />
            <FinderPropAmenities unit={unit} />
          </div>
          <div className="mx-1">
            <FinderPropRequest unit={unit} />
            <FinderPropLocation unit={unit} />
          </div>
        </div>
        <FinderSimilarUnits units={unit?.compound?.units} />
      </div>
    </FinderLayout>
  );
};

export default SingleExpoPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const localization = getLocalizationProps(ctx, "common");
  const unitId = ctx?.params?.id;
  const client = initializeApollo();
  const resp = await client.query({
    query: UNITS_BY_PK,
    variables: {
      id: unitId,
    },
  });
  const unit: Unit = resp?.data.units_by_pk;
  return {
    props: {
      localization,
      unit,
    },
  };
};
// export const getStaticPaths: GetStaticPaths = async () => {
// 	return {
// 		paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
// 		fallback: false,
// 	};
// };
