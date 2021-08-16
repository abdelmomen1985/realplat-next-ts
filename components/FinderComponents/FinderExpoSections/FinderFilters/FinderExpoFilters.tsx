import React, { useContext, useEffect, useState } from 'react';
import FinderDropDown from './FinderDropDown';
import { Unit } from '../../../../interfaces/index';
import FinderPropTypesDropDown from './PropTypesDropDown';
import { FilterListType } from '../../../../interfaces/filters';
import useTranslation from '../../../../hooks/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './filters.module.scss';
import Slider, { SliderTooltip } from 'rc-slider';
import { useRouter } from 'next/router';
import 'rc-slider/assets/index.css';

import { AppContext } from '../../../../Context/AppContextProvider';
interface SearchFiltersProps {
	setFilterListState: (val: FilterListType) => void;
	filterListState: any;
	units: Unit[];
}

const { Handle } = Slider;
const handle = (props: any) => {
	const { value, dragging, index, ...restProps } = props;
	return (
		<SliderTooltip
			prefixCls="slider-custom-tooltip"
			overlay={`${value} egp`}
			visible={true}
			placement="top"
			key={index}
		>
			<Handle value={value} {...restProps} />
		</SliderTooltip>
	);
};
export default function FinderExpoFilters(props: SearchFiltersProps) {
	const { t, locale } = useTranslation();
	const router = useRouter();
	const [openPropTypeDD, setOpenPropTypeDD] = useState(false);
	const [priceFilter, setPriceFilter] = useState<number[]>([0, 10000]);
	const unitList: any = props.units;
	const prices: any = [];
	const { isMobile, filterUnitsGlobal, filterState } = useContext(AppContext);
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

	const searchHandler = () => {
		filterUnitsGlobal({ ...filterState, fin_total: priceFilter });
		router.push(`/${locale}/finder-units`);
	};
	return (
		<>
			<section className="">
				<div
					className={clsx(
						styles.filtersContainer,
						' lg:text-justify flex md:justify-start'
					)}
				>
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
					{/* <span className={styles.verticalLine}>|</span> */}
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

					{/* prices */}
					<div className={styles.rangeContainer}>
						<div className={clsx(styles.rangeContainer, styles.rangeLabel)}>
							<img src="/images/icons/money.svg" className="mx-1" />
							<span className="mx-1">Price</span>
						</div>
						<Slider
							min={0}
							max={25000000}
							step={100000}
							onChange={(value) => setPriceFilter([0, value])}
							defaultValue={10000000}
							handle={handle}
						/>
					</div>

					{/* search */}
					<button
						onClick={searchHandler}
						className={clsx('btn-fnd-primary', styles.searchBtn)}
					>
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</div>
			</section>
		</>
	);
}
