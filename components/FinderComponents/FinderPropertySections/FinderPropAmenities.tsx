import React from 'react';
import useTranslation from './../../../hooks/useTranslation';

const FinderPropAmenities = ({ unit }: { unit: any }) => {
	const { t } = useTranslation();
	return (
		<section className="my-5">
			<h3 className="my-3 text-xl font-bold capitalize">{t('amenities')}</h3>
		</section>
	);
};

export default FinderPropAmenities;
