import React from 'react';
import useTranslation from './../../../hooks/useTranslation';

const FinderOverview = ({ unit }: { unit: any }) => {
	const { t, locale } = useTranslation();
	return (
		<section className="my-3">
			<h3 className="text-xl font-semibold capitalize text-gray-900">
				{t('overview')}
			</h3>
			<p className="text-base font-normal my-2">{unit?.description}</p>
		</section>
	);
};

export default FinderOverview;
