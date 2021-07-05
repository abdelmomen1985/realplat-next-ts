import React, { useState, useEffect, useContext, useRef } from 'react';
// import Carousel from 'react-elastic-carousel';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHeart,
	faCompress,
	faCompressAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import clsx from 'clsx';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { AppContext } from '../../../../Context/AppContextProvider';
import useTranslation from '../../../../hooks/useTranslation';
import { Unit } from '../../../../interfaces';
import styles from './finder-unit.module.scss';

const contactBtnsAnimation = {
	hidden: { y: -10, opacity: 0, x: -5 },
	visible: { y: 10, opacity: 1, transition: { duration: 0.4 }, x: 0 },
};
const FinderUnitCard = ({
	unit,
	wishListHandler,
	compareHandler,
	wishlisted,
}: {
	unit: Unit;
	wishListHandler: (val: any, val2: any) => void;
	compareHandler: (val: any, val2: any) => void;
	wishlisted: boolean;
}) => {
	const contactMenu = useRef<HTMLDivElement>(null);
	const { t, locale } = useTranslation();
	const router = useRouter();
	const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
	const [showContactMenu, setShowContactMenu] = useState<boolean>(false);
	const { isMobile } = useContext(AppContext);
	useEffect(() => {
		if (unit && unit?.media.length) {
			setImageUrl(unit?.media[0]);
		}
	}, [unit]);
	const singleUnitHandler = () => {
		router.push(
			`/${locale}/finder-units/[unit]/`,
			`/${locale}/finder-units/${unit.id}/`,
			{
				shallow: true,
			}
		);
	};
	const imageErrorHandler = () => {
		setImageUrl('https://i.imgur.com/bDujVXa.jpg');
	};

	const clickHandler = (e: any) => {
		if (contactMenu.current?.contains(e.target)) {
			return;
		}
		setShowContactMenu(false);
	};
	useEffect(() => {
		document.addEventListener('mousedown', clickHandler);
		return () => {
			document.removeEventListener('mousedown', clickHandler);
		};
	}, []);
	return (
		<AnimatePresence exitBeforeEnter>
			<div className="w-full m-3 flex ">
				<div
					className={
						'm-2 max-w-sm  rounded-lg shadow-lg flex-1 relative  ' +
						(unit.comparing ? 'bg-red text-white' : 'bg-white')
					}
				>
					<div className="relative">
						<img
							className="w-full cursor-pointer"
							style={{
								maxHeight: '250px',
								borderTopLeftRadius: '0.5rem',
								borderTopRightRadius: '0.5rem',
							}}
							onClick={singleUnitHandler}
							src={imageUrl!}
							onError={imageErrorHandler}
							alt="unit image"
						/>
						<div
							className="absolute flex justify-between text-sm"
							style={{ bottom: '50px', width: '100%' }}
						>
							<div
								className={styles.compareBtn}
								style={{ right: '15px', position: 'absolute' }}
							>
								{!unit.comparing ? (
									<span
										className="cursor-pointer"
										onClick={() => compareHandler(unit, wishlisted)}
									>
										<FontAwesomeIcon icon={faCompressAlt} />
									</span>
								) : (
									<span
										className="cursor-pointer"
										onClick={() => compareHandler(unit, wishlisted)}
									>
										<FontAwesomeIcon icon={faCompress} />
									</span>
								)}
							</div>
						</div>
					</div>
					<div
						className="absolute flex justify-between items-center text-sm"
						style={{ top: '15px', width: '100%' }}
					>
						<div
							className="bg-white p-3 text-black-500"
							style={{
								right: '15px',
								position: 'absolute',
								borderRadius: '50%',
								width: '30px',
								height: '30px',
								textAlign: 'center',
							}}
						>
							{wishlisted ? (
								<span
									className="cursor-pointer"
									onClick={() => wishListHandler(unit, wishlisted)}
								>
									<FontAwesomeIcon
										icon={faHeart}
										style={{
											color: 'var(--primary)',
											fontSize: '20px',
											textAlign: 'center',
											transform: 'translate(-34%, -30%)',
										}}
										aria-hidden="true"
										className=" text-custom-red  hover:text-opacity-50 text-opacity-50"
									/>
								</span>
							) : (
								<span
									className="cursor-pointer"
									onClick={() => wishListHandler(unit, wishlisted)}
								>
									<FontAwesomeIcon
										icon={farHeart}
										style={{
											color: 'var(--primary)',
											fontSize: '20px',
											textAlign: 'center',
											transform: 'translate(-34%, -30%)',
										}}
										className=" text-opacity-50"
										aria-hidden="true"
									/>
								</span>
							)}
						</div>
						<div>
							<span className="bg-success my-3 mx-2 capitalize font-noto-sans text-white px-3 py-1 rounded-md border-transparent">
								verified
							</span>
						</div>
					</div>
					<Link href={`/${locale}/finder-units/${unit.id}/`}>
						<a>
							<div className="px-6 py-2 flex justify-between">
								<div>
									<h5 className="font-noto-sans text-red uppercase text-base my-1">
										For Rent
									</h5>
									<h3
										className="text-lg my-1 font-semibold font-noto-sans capitalize"
										style={{
											color: '#454056',
										}}
									>
										{unit.bedrooms} {t('bedrooms')}{' '}
										{unit.property_type.name[locale]} || {unit?.land} {t('sqM')}
									</h3>
									<h5
										className="text-base font-normal my-1 capitalize font-noto-sans"
										style={{
											color: '#9691A4',
										}}
									>
										{unit.compound.name[locale]}
										{t('comma')}{' '}
										{locale === 'en' ? unit.sk_city.name : unit.sk_city.name_ar}
									</h5>
									<p className="my-2 text-lg font-medium font-noto-sans text-text-secondary flex justify-start items-center">
										<img src="/images/icons/money.svg" className="mx-1" />
										<span>
											{unit?.fin_monthly_payment} {t('egp')}
										</span>
									</p>
								</div>
							</div>
							<div
								className="px-6 py-2 flex justify-center items-center font-noto-sans"
								style={{ backgroundColor: '#E5E5E5' }}
							>
								<span className="flex justify-between items-center text-gray-700 mx-1 px-3 py-1 text-base font-semibold  mr-2 mb-2 text-text-secondary">
									<span className="mx-2">{unit?.land}</span>
									<span className="text-gray-900">{t('sqM')}</span>
								</span>
								<span className="flex justify-between items-center text-gray-700 mx-1 px-3 py-1 text-base font-semibold  mr-2 mb-2 text-text-secondary">
									<span className="mx-1">{unit.bedrooms}</span>
									<img src="/images/icons/bed.svg" className="mx-1" />
								</span>
								{/* <span className="flex justify-between items-center text-gray-700 mx-2 px-3 py-1 text-base font-semibold  mr-2 mb-2 text-text-secondary" >
              <img src="/images/garden.svg" className="mx-1" /> <span className="mx-1">{unit.bedrooms}</span>
            </span> */}
								<span className="flex justify-between items-center text-gray-700 mx-1 px-3 py-1 text-base font-semibold  mr-2 mb-2 text-text-secondary">
									<span className="mx-1">{unit.bathrooms}</span>
									<img src="/images/icons/bath.svg" className="mx-1" />
								</span>
							</div>
						</a>
					</Link>
				</div>
			</div>
		</AnimatePresence>
	);
};

export default FinderUnitCard;
