import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getLocalizationProps } from '../../../Context/LangContext';
import Link from 'next/link';
import useTranslation from './../../../hooks/useTranslation';
import FinderLayout from './../../../components/Layouts/FinderLayout';

const FinderExpoPage = () => {
	const { locale } = useTranslation();
	return (
		<FinderLayout title="Expo page">
			<Link
				href={`/${locale}/finder-expo/a55ae76e-6552-411d-be98-c0aeb804dd6d`}
			>
				<a className="text-center text-lg font-medium mx-auto my-5">
					Go To Single Expo
				</a>
			</Link>
		</FinderLayout>
	);
};

export default FinderExpoPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
	const localization = getLocalizationProps(ctx, 'common');
	return {
		props: {
			localization,
		},
	};
};
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
		fallback: false,
	};
};
