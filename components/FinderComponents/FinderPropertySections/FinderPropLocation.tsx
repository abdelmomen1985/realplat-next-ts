import React from 'react';

import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';

import styles from './finder-prop.module.scss';
import useTranslation from './../../../hooks/useTranslation';
import { Unit } from '../../../interfaces';

const defaultOptions = { scrollwheel: false };
const RegularMap = withScriptjs(
	withGoogleMap((props: any) => (
		<GoogleMap
			defaultZoom={14}
			defaultCenter={props.defaultCenter}
			defaultOptions={defaultOptions}
		>
			<Marker position={props.defaultCenter} />
		</GoogleMap>
	))
);
const FinderPropLocation = ({ unit }: { unit: Unit }) => {
	const { t, locale } = useTranslation();
	return (
		<section className="w-full my-4 relative">
			<RegularMap
				googleMapURL="https://maps.googleapis.com/maps/api/js"
				loadingElement={<div style={{ height: '100%' }} />}
				containerElement={<div style={{ height: '280px' }} />}
				mapElement={
					<div
						style={{
							height: '95%',
							borderRadius: '15px',
						}}
					/>
				}
				defaultCenter={{ lat: unit.lat, lng: unit.lng }}
			/>
			<button className={styles.directionsBtn}>
				<img src="/images/icons/directions.svg" />
				<span className="mx-2 text-base font-semibold text-white">
					Get Directions
				</span>
			</button>
			<h5 className="text-gray-700 text-base text-center font-normal">
				{unit.compound.name[locale]}
				{t('comma')}{' '}
				{locale === 'en' ? unit.sk_district?.name : unit.sk_district?.name_ar}
				{t('comma')}{' '}
				{locale === 'en' ? unit.sk_city?.name : unit.sk_city?.name_ar}
			</h5>
		</section>
	);
};

export default FinderPropLocation;
