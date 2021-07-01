import React, { useState } from 'react';
import styles from './finderExpo.module.scss';
import clsx from 'clsx';
import SearchByCity from './SearchByCity';
import FinderHeader from './../FinderNavigation/FinderHeader';

const SectionTitle = ({ title }: { title: string }) => {
	return (
		<div className="flex">
			<h1
				className={clsx(
					styles.notosansBoldMirage_28px,
					'font-semibold',
					'flex-grow'
				)}
			>
				{title}
			</h1>
			<div className={clsx('flex-grow')}></div>
			<div
				className={clsx(
					'flex',
					'items-center',
					styles.notosansNormalDolphin_14px
				)}
			>
				View All
				<img src="/images/finder/arrow.svg" alt="" />
			</div>
		</div>
	);
};
const ExpoCardUnit = () => {
	return (
		<div
			className={clsx(
				'flex-1',
				'flex',
				'justify-items-end',
				'mr-2',
				'relative',
				styles.expoHalf,
				styles.halfTop,
				'm-1'
			)}
		>
			<div className={clsx('absolute', 'top-4', 'left-4')}>
				<div className={clsx(styles.gradientBadge)}>Mellw Expo</div>
				<div className={clsx(styles.gradientBadge, styles.blueBadge)}>New</div>
			</div>
			<div className={clsx('self-end', 'm-4')}>
				<div className={clsx(styles.notosansNormalWhite_14px)}>COMMERCIAL</div>
				<div className={clsx(styles.notosansBoldWhite_20px)}>
					Luxury Office Space
				</div>

				<div className={clsx('mt-1', 'flex')}>
					<img src="/images/finder/pin.svg" alt="" />
					<div className={clsx(styles.notosansNormalWhite_14px, 'mx-2')}>
						Down Town, New Capital Cairo, Cairo
					</div>
				</div>
			</div>
		</div>
	);
};
const RecommededCard = () => {
	return (
		<div className={styles.recommendCard}>
			<div className={styles.badges}>
				<span className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-none text-indigo-100 bg-indigo-700 rounded">
					Mellw Offer
				</span>
			</div>
			<img src="/images/finder/recommend/card1.png" />
			<div
				className={clsx(
					styles.notosansNormalOutrageousOrange_12px,
					'mt-4',
					'mx-4'
				)}
			>
				RESIDENCIAL
			</div>
			<p className={clsx(styles.notosansBoldGunPowder_16px, 'mt-2', 'mx-4')}>
				3-bed Apartment | 167 sq.m
			</p>
			<div className={clsx(styles.notosansNormalManatee_14px, 'mt-2', 'mx-4')}>
				Mivida, New Cairo, Cairo
			</div>
			<div className={clsx('mt-2', 'mx-4', 'flex')}>
				<img src="/images/finder/cash.svg" />
				<span className={clsx(styles.notosansBoldDolphin_16px, 'mx-2')}>
					EGP 6,000,000
				</span>
			</div>
			<div className="my-4 flex justify-center">
				<img src="/images/finder/divider.svg" />
			</div>
			<div className="my-4 flex justify-center">
				<div className="flex mx-3">
					<span className={clsx('mx-1', styles.notosansNormalDolphin_14px)}>
						3
					</span>
					<img src="/images/finder/bed.svg" />
				</div>
				<div className="flex mx-3">
					<span className={clsx('mx-1', styles.notosansNormalDolphin_14px)}>
						1
					</span>
					<img src="/images/finder/bath.svg" />
				</div>
				<div className="flex mx-3">
					<span className={clsx('mx-1', styles.notosansNormalDolphin_14px)}>
						2
					</span>
					<img src="/images/finder/car.svg" />
				</div>
			</div>
		</div>
	);
};
export default function FinderExpoHead() {
	const squareIconsDefault = {
		apartment: '/images/finder/apartment.svg',
		villa: '/images/finder/villa.svg',
		comercial: '/images/finder/shop.svg',
		studios: '/images/finder/rent.svg',
		townhouses: '/images/finder/house-chosen.svg',
	};
	const squareIconsHover = {
		apartment: '/images/finder/apartment-hover.svg',
		villa: '/images/finder/villa-hover.svg',
		comercial: '/images/finder/shop-hover.svg',
		studios: '/images/finder/rent-hover.svg',
		townhouses: '/images/finder/house-chosen-hover.svg',
	};
	const [squareIcons, setSquareIcons] = useState(squareIconsDefault);
	return (
		<>
			<div className={styles.expo2}>
				<div className="flex">
					<div className="mt-12">
						<h1 className={clsx('')}>
							<div className={clsx(styles.notosansBoldOutrageousOrange_56px)}>
								Mellw Expo
							</div>
							<div className={styles.notosansNormalMirage_36px}>
								Online Property Show
							</div>
						</h1>
						<div className={clsx(styles.notosansNormalDolphin_20px, 'mt-4')}>
							Mellw your home search journey, and join Mellw Expo <br />
							online from your comfort couch !
						</div>
					</div>
					<div className="image-1">
						<div className="overlap-group1-1">
							<div className="bg"></div>
							<img className="image-2" src="/images/finder/hero-image.png" />
						</div>
					</div>
				</div>
				{/* icons */}
				<div className="mt-16 flex">
					<div
						className={styles.categorysquare}
						onMouseOver={() => {
							setSquareIcons({
								...squareIconsDefault,
								villa: squareIconsHover.villa,
							});
						}}
						onMouseOut={() => {
							setSquareIcons(squareIconsDefault);
						}}
					>
						<div className={styles.icon1}>
							<img className="apartment" src={squareIcons.villa} />
						</div>
						<div
							className={clsx(
								styles.notosansBoldMirage_16px,
								styles.categoryName
							)}
						>
							Villas
						</div>
					</div>
					<div
						className={styles.categorysquare}
						onMouseOver={() => {
							setSquareIcons({
								...squareIconsDefault,
								apartment: squareIconsHover.apartment,
							});
						}}
						onMouseOut={() => {
							setSquareIcons(squareIconsDefault);
						}}
					>
						<div className={styles.icon1}>
							<img className="apartment" src={squareIcons.apartment} />
						</div>
						<div
							className={clsx(
								styles.notosansBoldMirage_16px,
								styles.categoryName
							)}
						>
							Apartments
						</div>
					</div>
					<div
						className={styles.categorysquare}
						onMouseOver={() => {
							setSquareIcons({
								...squareIconsDefault,
								comercial: squareIconsHover.comercial,
							});
						}}
						onMouseOut={() => {
							setSquareIcons(squareIconsDefault);
						}}
					>
						<div className={styles.icon1}>
							<img className="apartment" src={squareIcons.comercial} />
						</div>
						<div
							className={clsx(
								styles.notosansBoldMirage_16px,
								styles.categoryName
							)}
						>
							Comercial
						</div>
					</div>
					<div
						className={styles.categorysquare}
						onMouseOver={() => {
							setSquareIcons({
								...squareIconsDefault,
								studios: squareIconsHover.studios,
							});
						}}
						onMouseOut={() => {
							setSquareIcons(squareIconsDefault);
						}}
					>
						<div className={styles.icon1}>
							<img className="apartment" src={squareIcons.studios} />
						</div>
						<div
							className={clsx(
								styles.notosansBoldMirage_16px,
								styles.categoryName
							)}
						>
							Studios
						</div>
					</div>
					<div
						className={styles.categorysquare}
						onMouseOver={() => {
							setSquareIcons({
								...squareIconsDefault,
								townhouses: squareIconsHover.townhouses,
							});
						}}
						onMouseOut={() => {
							setSquareIcons(squareIconsDefault);
						}}
					>
						<div className={styles.icon1}>
							<img className="apartment" src={squareIcons.townhouses} />
						</div>
						<div
							className={clsx(
								styles.notosansBoldMirage_16px,
								styles.categoryName
							)}
						>
							Townhouses
						</div>
					</div>
				</div>
				{/* home cards */}
				<div className={clsx(styles.homeCards)}>
					<div className={styles.homeCardsCard}>
						<img
							className="mt-2"
							src="/images/finder/illustration1.png"
							alt=""
						/>
						<div className={clsx(styles.notosansBoldMirage_24px, 'my-4')}>
							Mellw Expo
						</div>
						<div
							className={clsx(
								'mx-4',
								'text-center',
								'flex-grow',
								styles.notosansNormalDolphin_14px
							)}
						>
							Mellw your home search journey From your comfort couch join Mellw
							Expo online
						</div>

						<button className={clsx('my-4', 'btn', styles.brimaryBtn)}>
							Join Mellw Expo
						</button>
					</div>
					<div className={styles.homeCardsCard}>
						<img
							className="mt-2"
							src="/images/finder/illustration2.png"
							alt=""
						/>
						<div className={clsx(styles.notosansBoldMirage_24px, 'my-4')}>
							Mellw Offers
						</div>
						<div
							className={clsx(
								'mx-4',
								'text-center',
								'flex-grow',
								styles.notosansNormalDolphin_14px
							)}
						>
							Save your time searching the perfect property offer match your
							down payment & monthly installments
						</div>
						<button className={clsx('my-4', 'btn', styles.brimaryBtn)}>
							Search Mellw Offers
						</button>
					</div>
					<div className={styles.homeCardsCard}>
						<img
							className="mt-2"
							src="/images/finder/illustration3.png"
							alt=""
						/>
						<div className={clsx(styles.notosansBoldMirage_24px, 'my-4')}>
							Payment Reminders
						</div>
						<div
							className={clsx(
								'mx-4',
								'text-center',
								'flex-grow',
								styles.notosansNormalDolphin_14px
							)}
						>
							Add your property details & payment plan, to get notifications
							before installments due date Enjoy frequently property evaluation
						</div>
						<button className={clsx('my-4', 'btn', styles.brimaryBtn)}>
							Add Property
						</button>
					</div>
				</div>
				{/* Recommended Properties */}
				<div className="mt-16">
					<SectionTitle title="Recommended Properties" />
				</div>
				{/* cards */}
				<div className="mt-8 flex">
					<RecommededCard />
					<RecommededCard />
					<RecommededCard />
					<RecommededCard />
				</div>
				{/* Mellw Expo */}
				<div className="mt-16">
					<div className="flex items-center">
						<h1
							className={clsx(styles.notosansBoldMirage_28px, 'font-semibold')}
						>
							Mellw Expo
						</h1>
						<div className={clsx('flex-grow', 'ml-16', 'flex')}>
							<div className={clsx(styles.expoBadge)}>
								<span className={clsx(styles.notosansNormalGunPowder_14px)}>
									Apartments
								</span>
							</div>

							<div className={clsx(styles.expoBadge)}>
								<span className={clsx(styles.notosansNormalGunPowder_14px)}>
									Villas
								</span>
							</div>

							<div className={clsx(styles.expoBadge)}>
								<span className={clsx(styles.notosansNormalGunPowder_14px)}>
									Townhouses
								</span>
							</div>

							<div className={clsx(styles.expoBadge)}>
								<span className={clsx(styles.notosansNormalGunPowder_14px)}>
									Commercial property
								</span>
							</div>
						</div>
						<div
							className={clsx(
								'flex',
								'items-center',
								styles.notosansNormalDolphin_14px
							)}
						>
							View All
							<img src="/images/finder/arrow.svg" alt="" />
						</div>
					</div>
				</div>
				{/* Expo Promo Units */}
				<div className="mt-8 flex">
					<div
						className={clsx(
							'flex-1',
							'flex',
							'justify-items-end',
							styles.expoFull,
							'm-1',
							'mr-2',
							'relative'
						)}
					>
						<div className={clsx('absolute', 'top-4', 'left-4')}>
							<div className={clsx(styles.gradientBadge)}>Mellw Expo</div>
							<div className={clsx(styles.gradientBadge, styles.blueBadge)}>
								New
							</div>
						</div>

						<div className={clsx('self-end', 'm-4')}>
							<div className={clsx(styles.notosansNormalWhite_14px)}>
								COMMERCIAL
							</div>
							<div className={clsx(styles.notosansBoldWhite_20px)}>
								Luxury Office Space
							</div>

							<div className={clsx('mt-1', 'flex')}>
								<img src="/images/finder/pin.svg" alt="" />
								<div className={clsx(styles.notosansNormalWhite_14px, 'mx-2')}>
									Down Town, New Capital Cairo, Cairo
								</div>
							</div>
						</div>
					</div>
					<div className="flex-1 flex flex-col">
						<ExpoCardUnit />
						<ExpoCardUnit />
						{/* <div
              className={clsx(
                "flex-1",
                styles.expoHalf,
                styles.halfBtm,
                "m-1",
                "mt-4"
              )}
            >
              btm
            </div> */}
					</div>
				</div>
				{/* Calc Hero Section */}
				<div className={clsx(styles.calcHero)}>
					<div className={clsx('')}>
						<img src="/images/finder/calc-illustration.png" alt="" />
					</div>
					<div className={clsx('mt-16 ml-10')}>
						<h1 className={clsx(styles.notoxxxl)}>
							Calculate your Payment Plan with Real Estate Developers
							<span className={clsx(styles.zoom)}> Zoom </span>
							Meetings
						</h1>
						<p className={clsx('mt-10', styles.notosansNormalDolphin_16px)}>
							Book online or communicate directly with real estate developers
							through a zoom meeting, wherever you are and never miss any
							oppurtunity.
						</p>
						<button className={clsx('my-4', 'btn', styles.brimaryBtn)}>
							Join Mellw Expo
						</button>
					</div>
				</div>
				{/* Search By City */}
				<div className="mt-16">
					<SectionTitle title="Search By City " />
				</div>
				<SearchByCity />
				{/* Our Partners */}
				<div className="mt-16">
					<SectionTitle title="Our Partners " />
				</div>
				<div className={clsx('flex', 'mt-10')}>
					<div className={clsx(styles.notosansBoldNobel_28px, 'px-6')}>
						EMAAR
					</div>
					<div className={clsx(styles.notosansBoldNobel_28px, 'px-6')}>
						MODON
					</div>
					<div className={clsx(styles.notosansBoldNobel_28px, 'px-6')}>
						IMKAN
					</div>
					<div className={clsx(styles.notosansBoldNobel_28px, 'px-6')}>
						City Edge
					</div>
					<div className={clsx(styles.notosansBoldNobel_28px, 'px-6')}>
						SODIC
					</div>
					<div className={clsx(styles.notosansBoldNobel_28px, 'px-6')}>
						Palm Hills
					</div>
				</div>
			</div>
		</>
	);
}
