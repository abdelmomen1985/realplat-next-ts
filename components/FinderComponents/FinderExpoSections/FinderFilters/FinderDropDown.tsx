import { useQuery } from '@apollo/client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { GET_LOCATIONS } from '../../../../query/locations';
import useTranslation from '../../../../hooks/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAngleDown,
	faAngleUp,
	faCheck,
	faMapMarkerAlt,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../../../Context/AppContextProvider';
import clsx from 'clsx';
import styles from './filters.module.scss';
interface Ddprops {
	title: string;
	list: any;
	multiSelect: boolean;
	filtered: (val: any) => void;
	filterListState: any;
	icon: any;
	entryPoint: any;
}

export default function FinderDropDown(props: Ddprops) {
	const { data } = useQuery(GET_LOCATIONS);
	const [isOpenState, setIsOpenState] = useState(false);
	const [listTitle, setListTitle] = useState(props.title);
	const [locationsInnerState, setLocationsInnerState] = useState(data?.units);
	const { isMobile } = useContext(AppContext);
	// const list = props.list;
	const { t, locale } = useTranslation();
	const node = useRef<HTMLDivElement>(null);
	useEffect(() => {
		// Init state
		if (data?.units) {
			const dummyData = [...data?.units];
			const falseChecked = dummyData.map((item: any) => {
				return { ...item, selected: false };
			});
			setLocationsInnerState(falseChecked);
		}
	}, [data?.units]);
	useEffect(() => {
		let falseChecked = [];
		if (
			Object.keys(props.filterListState).length === 0 &&
			props.filterListState.constructor === Object
		) {
			setListTitle('location');
			if (data?.units) {
				const dummyData = [...data?.units];
				falseChecked = dummyData.map((item: any) => {
					return { ...item, selected: false };
				});
			}
		} else {
			if (data?.units) {
				const dummyData = [...data?.units];
				falseChecked = dummyData.map((item: any) => {
					if (item.sk_city._id === props.filterListState.sk_city) {
						return { ...item, selected: true };
					} else {
						return { ...item, selected: false };
					}
				});
			}
		}
		setLocationsInnerState(falseChecked);
	}, [props.filterListState]);
	useEffect(() => {
		// add when mounted
		document.addEventListener('mousedown', handleClick);
		// return function to be called when unmounted
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
	useEffect(() => {
		if (data && locationsInnerState.length > 0) {
			locationsInnerState.map((single: any) => {
				if (single.sk_city._id === props.filterListState.sk_city) {
					console.log(single.sk_city.name);
					setListTitle(
						locale === 'ar' ? single.sk_city.name_ar : single.sk_city.name
					);
				}
			});
		}
	}, [locationsInnerState]);
	const handleClick = (e: any) => {
		if (node?.current?.contains(e.target)) {
			// inside click
			return;
		}
		// outside click
		setIsOpenState(false);
	};
	const toggleList = () => {
		setIsOpenState(!isOpenState);
	};

	const selectItem = (item: any) => {
		item.selected = !item.selected;
		const newArray = locationsInnerState.map((single: any) => {
			if (single.sk_city._id === item.sk_city._id) return item;
			return { ...single, selected: false };
		});
		setLocationsInnerState(newArray);

		let duplicateLocations = { ...props.filterListState };
		if (duplicateLocations.sk_city === item.sk_city._id) {
			delete duplicateLocations.sk_city;
			props.filtered(duplicateLocations);
			console.log(duplicateLocations);
			setListTitle('location');
		} else {
			setListTitle(locale === 'ar' ? item.sk_city.name_ar : item.sk_city.name);
			let filteredList = { ...props.filterListState };
			// setFilterList(...filterList, id)
			filteredList.sk_city = item.sk_city._id;
			props.filtered(filteredList);
			console.log(filteredList);
		}
		setIsOpenState(false);
	};

	return (
		<>
			<style jsx>
				{`
					.filter-button {
						color: #9691a4;
						border: none;
						border-radius: 5px;
						font-weight: 500;
						outline: none;
						position: relative;
					}
					.filter-button::after {
						content: ' ';
						position: absolute;
						left: 100%;
						top: 18%;
						bottom: auto;
						width: 1px;
						height: 70%;
						background: #efecf3;
						z-index: 9999;
						margin-top: auto;
					}
					.circularIcon {
						width: 10px;
						height: 10px;
						margin-right: 5px;
						background-color: #edae49;
						border-radius: 50%;
						border: transparent;
						display: block;
					}
				`}
			</style>
			<div className="dd-wrapper relative" ref={node}>
				<button
					type="button"
					className=" dd-header text-lg md:text-base border py-3 px-3 border-gray-400 bg-white rounded-md font-medium filter-button"
					onClick={toggleList}
				>
					<div className="dd-header-title flex justify-center lg:justify-between items-center">
						<span>
							<FontAwesomeIcon icon={faMapMarkerAlt} className="mx-1" />
						</span>
						{listTitle !== 'location' && <span className="circularIcon"></span>}{' '}
						{t(`${listTitle.toLowerCase()}`)}{' '}
						{isOpenState ? (
							<span>
								{' '}
								<FontAwesomeIcon className="mx-1" icon={faAngleUp} />
							</span>
						) : (
							<span>
								<FontAwesomeIcon className="mx-1" icon={faAngleDown} />
							</span>
						)}
					</div>
				</button>
				{isOpenState && (
					<div
						role="list"
						className={clsx(styles.ddList, 'absolute')}
						style={{
							top: '50px',
							background: '#fff',
							borderRadius: '5px',
							boxShadow: '0 2px 2px #eee',
							zIndex: 999,
							width: isMobile ? '90%' : '250px',
							left: isMobile ? '0' : 'auto',
							right: isMobile ? '0' : 'auto',
							margin: isMobile ? '0 auto' : '',
						}}
					>
						{locationsInnerState.map((item: any) => (
							<button
								type="button"
								style={{
									display: 'block',
									margin: '.5em',
									fontSize: '16px',
								}}
								key={item.sk_city._id}
								onClick={() => {
									selectItem(item);
								}}
							>
								<span style={{ display: 'inline-block', width: '1em' }}>
									{item.selected ? (
										<FontAwesomeIcon
											style={{ color: 'var(--primary)' }}
											icon={faTimes}
										/>
									) : (
										<FontAwesomeIcon
											icon={faCheck}
											className={clsx(
												styles.faCheckIcon,
												'opacity-0 fnd-primary'
											)}
										/>
									)}
								</span>
								<span style={{ margin: '.5em' }}>
									{locale === 'ar' ? item.sk_city.name_ar : item.sk_city.name}{' '}
								</span>
							</button>
						))}
					</div>
				)}
			</div>
		</>
	);
}
