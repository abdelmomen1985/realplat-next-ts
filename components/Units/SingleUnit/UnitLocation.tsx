import React from 'react';
import useTranslation from '../../../hooks/useTranslation';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';
import { Unit } from '../../../interfaces';

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
export default function UnitLocation({ unit }: { unit: Unit }) {
	const { t } = useTranslation();

	return (
		<div className="my-3 border-gray-300 rounded-md shadow-md">
			{/* map api that recieves lat and lang */}
			<h3
				className="mb-3 py-4 w-100 px-5 text-text-secondary rounded-md flex justify-start items-center"
				style={{ backgroundColor: '#F5F6F7' }}
			>
				<img src="/images/location.png" />
				<span className="text-lg font-medium mx-4 capitalize">
					{t('location')}
				</span>
			</h3>
			<RegularMap
				googleMapURL="https://maps.googleapis.com/maps/api/js"
				loadingElement={<div style={{ height: '100%' }} />}
				containerElement={<div style={{ height: '280px', margin: '10px' }} />}
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
		</div>
	);
}
