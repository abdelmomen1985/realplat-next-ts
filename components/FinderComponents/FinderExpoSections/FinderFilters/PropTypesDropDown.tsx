import { useQuery } from '@apollo/client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { FilterListType, PropertyType } from '../../../../interfaces/filters';
import { GET_PROPERTY_TYPES } from '../../../../query/propertyTypes';
import useTranslation from '../../../../hooks/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheck,
	faAngleUp,
	faAngleDown,
	faHome,
} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../../../Context/AppContextProvider';
import clsx from 'clsx';
import styles from './filters.module.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface PropTypesDropDownProps {
	title: string;
	filtered: (val: FilterListType) => void;
	filterListState: any;
	icon: any;
	entryPoint: any;
	isOpen: boolean;
	toggOpen: (flag: boolean) => void;
}

export default function FinderPropTypesDropDown({
	title,
	filtered,
	filterListState,
	entryPoint,
	isOpen,
	toggOpen,
}: PropTypesDropDownProps) {
	const { data } = useQuery(GET_PROPERTY_TYPES);
	const [listTitle, setListTitle] = useState<string>(title);
	//const [setInnerFilterList] = useState<any[]>([]);
	const { t, locale } = useTranslation();
	const { isMobile } = useContext(AppContext);
	const [propTypesInnerState, setPropTypesInnerState] = useState<any[]>(
		data?.property_types
	);
	const node = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Init state
		if (data?.property_types) {
			const dummyData = [...data?.property_types];
			const falseChecked = dummyData.map((item: any) => {
				return { ...item, selected: false };
			});
			setPropTypesInnerState(falseChecked);
		}
	}, [data?.property_types]);

	useEffect(() => {
		console.log('use Effect is running');
		if (
			Object.keys(filterListState).length === 0 &&
			filterListState.constructor === Object
		) {
			console.log('use Effect condition is running');
			setListTitle('prop_type');
			if (data?.property_types) {
				const dummyData = [...data?.property_types];
				const falseChecked = dummyData.map((item: any) => {
					return { ...item, selected: false };
				});
				setPropTypesInnerState(falseChecked);
				//setInnerFilterList([]);
				toggOpen(false);
			}
		}
	}, [filterListState]);
	useEffect(() => {
		// add when mounted
		document.addEventListener('mousedown', handleClick);
		// return function to be called when unmounted
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
	const handleClick = (e: any) => {
		if (node?.current?.contains(e.target)) {
			// inside click
			return;
		}
		// outside click
		toggOpen(false);
	};

	const multiSelectItem = (item: PropertyType) => {
		// Toggle selected
		item.selected = !item.selected;

		const newArray = propTypesInnerState.map((single: PropertyType) => {
			if (single.id === item.id) return item;
			return single;
		});
		const onlySelectedArray = newArray.filter(
			(item: PropertyType) => item.selected === true
		);
		console.log(onlySelectedArray);
		setPropTypesInnerState(newArray);
		let filteredList = { ...filterListState };
		const selectedIds = onlySelectedArray.map(
			(single: PropertyType) => single.id
		);
		filteredList[entryPoint] = selectedIds.length > 0 ? selectedIds : null;
		filtered(filteredList);

		// label change
		if (onlySelectedArray.length === 1) {
			setListTitle(`${onlySelectedArray[0].name[locale]}`);
		} else if (onlySelectedArray.length === 2) {
			setListTitle(
				`${onlySelectedArray[0].name[locale]} + ${onlySelectedArray[1].name[locale]}`
			);
		} else if (onlySelectedArray.length > 2) {
			setListTitle(
				`${onlySelectedArray[0].name[locale]} + ${onlySelectedArray.length - 1}`
			);
		} else if (onlySelectedArray.length === 0) {
			setListTitle('prop_type');
		} else {
			setListTitle(`${onlySelectedArray[0].name[locale]}`);
		}
	};

	return (
		<>
			<style jsx>
				{`
					.filter-button {
						color: #9691a4;
						border: none;
						border-radius: 5px;
						margin-inline-start: -4px;
						font-weight: 500;
						outline: none;
						box-shadow: 0px 2px 8px -4px rgba(31, 27, 45, 0.12),
							0px 4px 16px rgba(31, 27, 45, 0.12);
						border-radius: 10px 0px 0px 10px;
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
					className="dd-header text-lg md:text-base border py-3 px-3 bg-white border-gray-400 rounded-md font-medium filter-button"
					onClick={() => {
						toggOpen(!isOpen);
					}}
				>
					<div className="dd-header-title flex justify-center lg:justify-between items-center">
						<span>
							<FontAwesomeIcon icon={faHome} className="mx-1" />
						</span>
						{listTitle !== 'prop_type' && (
							<span className="circularIcon"></span>
						)}
						{t(`${listTitle.toLowerCase()}`)}{' '}
						{isOpen ? (
							<span>
								{' '}
								<FontAwesomeIcon icon={faAngleUp} className="mx-1" />
							</span>
						) : (
							<span>
								<FontAwesomeIcon icon={faAngleDown} className="mx-1" />
							</span>
						)}
					</div>
				</button>
				{isOpen && (
					<div
						role="list"
						className={clsx(styles.ddList, 'absolute')}
						style={{
							top: '50px',
							background: '#fff',
							borderRadius: '5px',
							boxShadow: '0 2px 2px #eee',
							zIndex: 900,
							width: isMobile ? '90%' : '250px',
							left: isMobile ? '0' : 'auto',
							right: isMobile ? '0' : 'auto',
							margin: isMobile ? '0 auto' : '',
						}}
					>
						{propTypesInnerState &&
							propTypesInnerState.map((item: PropertyType) => (
								<button
									type="button"
									style={{
										display: 'block',
										margin: '.5em',
										fontSize: '16px',
									}}
									key={item.id}
									onClick={() => multiSelectItem(item)}
								>
									<span style={{ display: 'inline-block', width: '1em' }}>
										{item.selected ? (
											<FontAwesomeIcon
												style={{ width: '1em' }}
												icon={faTimes}
												className="fnd-primary"
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
									<span style={{ margin: '.5em' }}>{item.name[locale]} </span>
								</button>
							))}
					</div>
				)}
			</div>
		</>
	);
}
