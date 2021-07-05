import React from 'react';
import { Unit } from '../../../interfaces';
import useTranslation from './../../../hooks/useTranslation';

const FinderPropDetails = ({ unit }: { unit: Unit }) => {
	const { t, locale } = useTranslation();
	return (
		<section className="my-5">
			<h3 className="my-2 text-lg font-semibold capitalize ">
				{t('propDetails')}
			</h3>
			<h5
				className="font-noto-sans my-1"
				style={{
					color: '#666276',
				}}
			>
				<span className="text-base font-semibold capitalize">
					{t('type')}:{' '}
				</span>
				<span className="text-base font-normal capitalize">
					{unit?.property_type.name[locale]}
				</span>
			</h5>
			<h5
				className="font-noto-sans my-1"
				style={{
					color: '#666276',
				}}
			>
				<span className="text-base font-semibold capitalize">
					{t('apartArea')}:{' '}
				</span>
				<span className="text-base font-normal capitalize">{unit?.land}</span>
			</h5>
			<h5
				className="font-noto-sans my-1"
				style={{
					color: '#666276',
				}}
			>
				<span className="text-base font-semibold capitalize">
					{t('built')}:{' '}
				</span>
				<span className="text-base font-normal capitalize">
					{unit?.delivery_year}
				</span>
			</h5>
			<h5
				className="font-noto-sans my-1"
				style={{
					color: '#666276',
				}}
			>
				<span className="text-base font-semibold capitalize">
					{t('bedrooms')}:{' '}
				</span>
				<span className="text-base font-normal capitalize">
					{unit?.bedrooms}
				</span>
			</h5>
			<h5
				className="font-noto-sans my-1"
				style={{
					color: '#666276',
				}}
			>
				<span className="text-base font-semibold capitalize">
					{t('bathrooms')}:{' '}
				</span>
				<span className="text-base font-normal capitalize">
					{unit?.bathrooms}
				</span>
			</h5>
			<h5
				className="font-noto-sans my-1"
				style={{
					color: '#666276',
				}}
			>
				<span className="text-base font-semibold capitalize">
					{t('parkingPlaces')}: {unit?.parking}
				</span>
				<span className="text-base font-normal capitalize">
					{unit?.parking}
				</span>
			</h5>
			<h5
				className="font-noto-sans my-1"
				style={{
					color: '#666276',
				}}
			>
				<span className="text-base font-semibold capitalize">
					{t('petsAllowed')}:{' '}
				</span>
				<span className="text-base font-normal capitalize">
					{unit?.petsAllowed}
				</span>
			</h5>
		</section>
	);
};

export default FinderPropDetails;
