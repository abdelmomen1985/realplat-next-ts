import React, { useContext, useEffect, useState } from 'react';
import { Unit } from '../../../../interfaces/index';
import FinderDropDown from './FinderDropDown';
import FinderPricesModal from './FinderPricesModal';
import FinderMoreFiltersModal from './FinderMoreFiltersModal';
import FinderPropTypesDropDown from './FinderPropTypesDropDown';
import { FilterListType } from '../../../../interfaces/filters';
import useTranslation from '../../../../hooks/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { AppContext } from '../../../../Context/AppContextProvider';
interface SearchFiltersProps {
	setFilterListState: (val: FilterListType) => void;
	filterListState: any;
	units: Unit[];
}

export default function FinderSearchFilters(props: SearchFiltersProps) {
	const { t } = useTranslation();
	const [openPropTypeDD, setOpenPropTypeDD] = useState(false);
	const unitList: any = props.units;
	const prices: any = [];
	const { isMobile } = useContext(AppContext);
	const locations: any = [];
	useEffect(() => {
		for (let unit in unitList) {
			prices.push({
				id: unitList[unit].id,
				totalPrice: unitList[unit].fin_total,
				downPayment: unitList[unit].fin_down_payment,
				monthlyPayment: unitList[unit].fin_monthly_payment,
				paymentYears: unitList[unit].fin_fin_years,
			});
			let duplicateLocations = locations.filter((location: any) => {
				return location.id === unitList[unit].sk_city._id;
			});
			if (duplicateLocations.length === 0) {
				locations.push({
					id: unitList[unit].sk_city._id,
					name: {
						ar: unitList[unit].sk_city.name_ar,
						en: unitList[unit].sk_city.name,
					},
				});
			}
		}
	}, []);

	return (
		<>
			<section className="">
				<div className="text-center font-noto-sans lg:text-justify grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-6 gap-2 bg-gray-300 py-5 w-100">
					{/* Location */}
					<FinderDropDown
						title="Location"
						icon="fas fa-map-marked-alt"
						list={locations}
						multiSelect={false}
						filtered={props.setFilterListState}
						filterListState={props.filterListState}
						entryPoint="sk_city"
					/>
					{/* property Type */}

					<FinderPropTypesDropDown
						title="prop_type"
						icon="fas fa-home"
						filtered={props.setFilterListState}
						filterListState={props.filterListState}
						entryPoint="property_types"
						isOpen={openPropTypeDD}
						toggOpen={(flag) => {
							setOpenPropTypeDD(flag);
						}}
					/>

					{/* prices */}
					{/* recreate another Component with Ranges */}
					<FinderPricesModal
						filtered={props.setFilterListState}
						filterListState={props.filterListState}
					/>
					<FinderMoreFiltersModal
						filtered={props.setFilterListState}
						filterListState={props.filterListState}
					/>
					<div className={clsx('relative', !isMobile ? 'col-span-2' : '')}>
						<button
							className="py-2 px-3 text-black border-none text-text-secondary text-lg font-medium hover:bg-gray-100 rounded-md hover:shadow-md"
							onClick={() => {
								props.setFilterListState({} as any);
								console.log(props.filterListState);
							}}
						>
							{t('clearFilters')}
							<FontAwesomeIcon
								icon={faTimes}
								className="text-red-600 fa-lg  px-1 py-1 mx-1 "
							/>
						</button>

						<button
							className="py-2 px-3 text-black border-none text-text-secondary text-lg capitalize font-medium hover:bg-gray-100 rounded-md hover:shadow-md"
							onClick={() => {
								// TODO save search logic
							}}
						>
							{t('saveSearch')}
							<FontAwesomeIcon
								icon={faPlus}
								className="text-green-500  px-1 py-1 mx-1  "
							/>
						</button>
					</div>
				</div>
			</section>
		</>
	);
}
