import { GetServerSideProps } from 'next';
import React from 'react';
import { getLocalizationProps } from '../../../Context/LangContext';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';
import Link from 'next/link';
import useTranslation from './../../../hooks/useTranslation';
import { UNITS_BY_PK } from './../../../query/unitsQuery';
import { initializeApollo } from './../../../lib/apolloClient';
import FinderLayout from './../../../components/Layouts/FinderLayout';
import FinderBreadCrumbs from '../../../components/FinderComponents/FinderPropertySections/FinderBreadCrumbs';
import FinderSingleUnitHero from './../../../components/FinderComponents/FinderPropertySections/FinderSingleUnitHero';
import FinderOverview from './../../../components/FinderComponents/FinderPropertySections/FinderOverview';
import FinderPropDetails from './../../../components/FinderComponents/FinderPropertySections/FinderPropDetails';
import FinderPropAmenities from './../../../components/FinderComponents/FinderPropertySections/FinderPropAmenities';
import FinderPropRequest from './../../../components/FinderComponents/FinderPropertySections/FinderPropRequest/FinderPropRequest';

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
const SingleExpoPage = ({ unit }: { unit: any }) => {
	const { t, locale } = useTranslation();

	return (
		<FinderLayout>
			<FinderBreadCrumbs unit={unit} />
			<FinderSingleUnitHero unit={unit} />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
				<div className="col-span-1 md:col-span-2">
					<div className="flex justify-start items-center px-3">
						<span className="bg-success mx-2 capitalize text-white px-4 py-2 rounded-md border-transparent">
							verified
						</span>
						<span className="bg-info mx-2 capitalize text-white px-4 py-2 rounded-md border-transparent">
							New
						</span>
					</div>
					<h3 className="px-3 my-4">
						<span className="text-2xl font-bold text-black">
							{t('egp')}
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
				<div>
					<FinderPropRequest unit={unit} />
				</div>
			</div>
		</FinderLayout>
	);
};

export default SingleExpoPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const localization = getLocalizationProps(ctx, 'common');
	const unitId = ctx?.params?.id;
	const client = initializeApollo();
	const resp = await client.query({
		query: UNITS_BY_PK,
		variables: {
			id: unitId,
		},
	});
	const unit: any = resp?.data.units_by_pk;
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
