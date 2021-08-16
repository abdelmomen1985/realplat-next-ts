import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { useEffect } from 'react';
import FinderExpo from '../../components/FinderComponents/FinderExpoSections/FinderExpo';
import FinderLayout from '../../components/Layouts/FinderLayout';
import { getLocalizationProps } from '../../Context/LangContext';
import { Unit } from '../../interfaces';
import { initializeApollo } from '../../lib/apolloClient';
import { ALL_UNITS } from '../../query/unitsQuery';
/*
import useTranslation from '../../hooks/useTranslation';
import MainSection from "./../../components/HomeSections/MainSection";
import ServicesSection from "./../../components/HomeSections/ServicesSection";
import ExplorerSection from "./../../components/HomeSections/ExplorerSection";
import GuidesSection from "./../../components/HomeSections/GuidesSection";
import Exhibitors from "../../components/ExpoSections/Exhibitors";
import HowWorksSection from "../../components/ExpoSections/HowWorksSection";
import MainExpoSection from "../../components/ExpoSections/MainExpoSection";
import { initializeApollo } from './../../lib/apolloClient';
*/

const IndexPage: NextPage = (props: any) => {
	// const { t } = useTranslation();
	const { units } = props;
	// just refresh the heroku api
	useEffect(() => {
		fetch('https://hubgraph.herokuapp.com/').then(() => {
			console.log('hubgraph fetched');
		});
	}, []);
	return (
		/* top section 
    <Layout title="Realestate Brand">
      
      <MainSection />
      <ServicesSection />
      <ExplorerSection />
      <GuidesSection />
      
      <MainExpoSection />
      <Exhibitors />
      <HowWorksSection />
      
      </Layout>
      
      */
		<FinderLayout>
			<FinderExpo units={units} />
		</FinderLayout>
	);
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const localization = getLocalizationProps(ctx, 'common');
	const client = initializeApollo();
	const resp = await client.query({ query: ALL_UNITS });

	let dummyUnits = resp?.data.units;
	let units: Unit[] = [];
	for (let unit in dummyUnits) {
		units.push({ ...dummyUnits[unit], wishListed: false, comparing: false });
	}
	return {
		props: {
			localization,
			units,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
		fallback: false,
	};
};
export default IndexPage;
