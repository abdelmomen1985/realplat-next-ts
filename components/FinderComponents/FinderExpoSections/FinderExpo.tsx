import clsx from 'clsx';
import { useContext } from 'react';
import { AppContext } from './../../../Context/AppContextProvider';
import { Unit } from '../../../interfaces';
import FinderUnitCard from '../FinderPropertySections/FinderUnits/FinderUnitCard';
import styles from './finderExpo.module.scss';
import FinderHomeCatIcons from './FinderHomeCatIcons';
import SearchByCity from './SearchByCity';
import SectionTitle from './SectionTitle';
import FinderExpoFilters from './FinderFilters/FinderExpoFilters';

const dummyUnit: Unit = {
	media: [
		'https://storage.googleapis.com/sakneen-api-files/160159044183502-%20Town%20House%20Back%20Alt%2001.jpeg',
	],
	property_type: {
		name: {
			ar: 'شقة',
			en: 'apartment',
		},
	},
	compound: {
		name: {
			ar: 'دي جويا',
			en: 'De Joya',
		},
	},
	sk_city: {
		name: 'Ein Sokhna',
		name_ar: 'العين السخنة',
	},
	fin_total: 6000000,
	bedrooms: 2,
	bua: 80,
	bathrooms: 1,
} as Unit;

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

export default function FinderExpo({ units }: { units: Unit[] }) {
	const { filterUnitsGlobal, filterState } = useContext(AppContext);
	return (
		<>
			<div className={styles.expo2}>
				<div className="flex flex-col sm:flex-row">
					<div className="mt-4 md:mt-12 py-4 md:w-5/12">
						<h1 className={clsx('mx-2 sm:m-0 my-2')}>
							<div className={clsx(styles.homeMellwExpoH1)}>Mellw Expo</div>
							<div className={clsx(styles.homeMellwExpoH1Sub, 'mt-4')}>
								Online Property Show
							</div>
						</h1>
						<div className="relative mt-4">
							<div
								className={clsx(
									styles.notosansNormalDolphin_18px,
									'mx-2 sm:m-0 absolute inset-0 w-screen'
								)}
							>
								Mellw your home search journey, and join Mellw Expo <br />
								online from your comfort couch !
							</div>
						</div>
					</div>
					<div className="mt-16 md:mt-0 md:w-7/12">
						<div className="overlap-group1-1">
							<div className="bg"></div>
							<img className="" src="/images/finder/hero-image.png" />
						</div>
					</div>
				</div>
				<FinderExpoFilters
					units={units}
					filterListState={filterState}
					setFilterListState={filterUnitsGlobal}
				/>
				{/* categories icons */}
				<FinderHomeCatIcons />
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
						<button className={clsx('my-4 btn btn-fnd-primary')}>
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
						<button className={clsx('my-4 btn btn-fnd-primary')}>
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
						<button className={clsx('my-4 btn btn-fnd-primary')}>
							Add Property
						</button>
					</div>
				</div>
				{/* Recommended Properties */}
				<div className="mt-16">
					<SectionTitle title="Recommended Properties" />
				</div>
				{/* cards */}
				<div className="m-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 gap-y-4 justify-items-start justify-center items-start">
					<FinderUnitCard
						wishlisted={false}
						unit={dummyUnit}
						wishListHandler={(_v1, _v2) => {}}
						compareHandler={(_v1, _v2) => {}}
						canCompare={false}
					/>
					<FinderUnitCard
						wishlisted={false}
						unit={dummyUnit}
						wishListHandler={(_v1, _v2) => {}}
						compareHandler={(_v1, _v2) => {}}
						canCompare={false}
					/>
					<FinderUnitCard
						wishlisted={false}
						unit={dummyUnit}
						wishListHandler={(_v1, _v2) => {}}
						compareHandler={(_v1, _v2) => {}}
						canCompare={false}
					/>
					<FinderUnitCard
						wishlisted={false}
						unit={dummyUnit}
						wishListHandler={(_v1, _v2) => {}}
						compareHandler={(_v1, _v2) => {}}
						canCompare={false}
					/>
				</div>
				{/* Mellw Expo */}
				<div className="mt-16">
					<div className="md:flex items-center m-2 md:m-0">
						<h1
							className={clsx(styles.notosansBoldMirage_28px, 'font-semibold')}
						>
							Mellw Expo
						</h1>
						<div
							className={clsx(
								'md:flex-grow md:ml-16 flex overflow-x-scroll md:overflow-x-auto'
							)}
						>
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
						<button className={clsx('my-4 btn btn-fnd-primary')}>
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
				<div
					className={clsx('flex mt-10 overflow-x-scroll md:overflow-x-auto')}
				>
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
