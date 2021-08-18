import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import FinderLayout from '../../../components/Layouts/FinderLayout';
import { getLocalizationProps } from '../../../Context/LangContext';
export default function Profile() {
	return (
		<>
			<FinderLayout>
				<div>
					<h3>Profile Page</h3>
				</div>
			</FinderLayout>
		</>
	);
}
export const getStaticProps: GetStaticProps = async (ctx) => {
	// Example for including static props in a Next.js function component page.
	// Don't forget to include the respective types for any props passed into
	// the component.

	// const client = initializeApollo();

	// const resp = await client.query({ query: ALL_UNITS });
	//const { data } = useQuery(allCompounds);
	// let dummyUnits = resp?.data.units;

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
