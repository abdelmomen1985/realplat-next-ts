import React from 'react';

import { getLocalizationProps } from '../../../Context/LangContext';
import { initializeApollo } from '../../../lib/apolloClient';
import { UNITS_BY_PK } from '../../../query/unitsQuery';
import { GetServerSideProps } from 'next';

import InteriorFeatures from './../../../components/Units/SingleUnit/InteriorFeatures';
import DaysMarket from './../../../components/Units/SingleUnit/DaysMarket';
import SimilarUnits from './../../../components/Units/SingleUnit/SimilarUnits';
import SingleUnitHeroSection from './../../../components/Units/SingleUnit/SingleUnitHeroSection';
import BreadCrumbs from './../../../components/Units/SingleUnit/BreadCrumbs';
import {
	Layout,
	UnitInformation,
	FloorPlan,
	FinancialAnalysis,
} from './../../../components/exports';
import UnitLocation from '../../../components/Units/SingleUnit/UnitLocation';

const SingleUnit = ({ unit }: { unit: any }) => {
	// const { t, locale } = useTranslation();

	return (
		<Layout>
			<BreadCrumbs unit={unit} />
			<div className="container px-3 mx-auto">
				<SingleUnitHeroSection unit={unit} />

				<UnitInformation unit={unit} />

				<FinancialAnalysis unit={unit} />
				<UnitLocation unit={unit} />

				<FloorPlan unit={unit} />

				<InteriorFeatures unit={unit} />

				<DaysMarket />

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
	const localization = getLocalizationProps(context, 'common');
	return {
		props: {
			localization,
			unit,
		},
	};
};
export default SingleUnit;
