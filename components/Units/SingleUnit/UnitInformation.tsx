import React, { useState, useContext, useEffect } from 'react';
import useTranslation from '../../../hooks/useTranslation';
import styles from './unit.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from './../../../Context/AppContextProvider';
import { Unit } from '../../../interfaces';

const TabbedInfo = ({ unit }: { unit: Unit }) => {
	const { t, locale } = useTranslation();

	const { isMobile } = useContext(AppContext);

	useEffect(() => {
		if (locale === 'en') {
			setFirstTab(styles.firstTab);
			setSecondTab(styles.secondTab);
		} else {
			setFirstTab(styles.firstArTab);
			setSecondTab(styles.secondArTab);
		}
	}, [locale]);
	const [currentTab, setCurrentTab] = useState<number>(1);
	const [firstTab, setFirstTab] = useState(styles.firstTab);
	const [secondTab, setSecondTab] = useState(styles.secondTab);
	return (
		<div className="flex justify-start items-baseline py-6 my-3 relative">
			{/* tabs here */}
			<div className={styles.tab}>
				<button
					className={clsx(styles.tabBtn, currentTab === 1 && styles.activeBtn)}
					onClick={() => setCurrentTab(1)}
				>
					{t('unitInfo')}
				</button>
				{currentTab === 1 && (
					<div className={firstTab}>
						<div className={styles.tabContainer}>
							<h4
								className="mt-5 mb-3 py-4 w-100 px-3 text-text-secondary flex justify-start items-center"
								style={{ backgroundColor: '#F5F6F7' }}
							>
								<img src="/images/compound.png" />
								<span className="text-2xl font-medium mx-2 capitalize">
									{t('compound')}: {unit.compound.name[locale]}
								</span>
							</h4>
							<div className="flex flex-wrap justify-between px-3 py-4 my-3 items-center">
								<div>
									<h4 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center">
										<img src="/images/land.png" />
										<span className="text-lg font-medium mx-2 capitalize">
											{t('space')}: {unit.land}
											{t('meter')}
										</span>
									</h4>
									<h4 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center">
										<img src="/images/bath.png" />
										<span className="text-lg font-medium mx-2 capitalize">
											{t('bathrooms')}: {unit.bathrooms}
										</span>
									</h4>
								</div>
								<div>
									<h4 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center">
										<img src="/images/proptype.png" />
										<span className="text-lg font-medium mx-2 capitalize">
											{t('type')}: {unit.property_type.name[locale]}
										</span>
									</h4>
									<h4 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center">
										<img src="/images/bed.png" />
										<span className="text-lg font-medium mx-2 capitalize">
											{t('bedrooms')}: {unit.bedrooms}
										</span>
									</h4>

									{/* <h3 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center"
                    >
                      <img src="/images/garden.png" />
                      <span className="text-lg font-medium mx-2 capitalize">garden: {unit.compound.name[locale]}</span>
                    </h3> */}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className={styles.tab}>
				<button
					className={clsx(styles.tabBtn, currentTab === 2 && styles.activeBtn)}
					onClick={() => setCurrentTab(2)}
				>
					{t('deliveryDetails')}
				</button>
				{currentTab === 2 && (
					<div className={isMobile ? firstTab : secondTab}>
						<div className={styles.tabContainer}>
							<h3
								className="mt-5 mb-3 py-4 w-100 px-3 text-text-secondary flex justify-start items-center"
								style={{ backgroundColor: '#F5F6F7' }}
							>
								<FontAwesomeIcon
									icon={faCalendar}
									className="text-primary text-2xl font-medium mr-1"
									aria-hidden="true"
								/>
								<span className="text-2xl font-medium mx-2 capitalize">
									{t('deliveryTime')}
								</span>
							</h3>
							<div className="flex flex-wrap justify-between px-3 py-4 my-3 items-center">
								<div>
									<h4 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center">
										<FontAwesomeIcon
											icon={faCalendar}
											className="text-primary text-lg font-medium mr-1"
											aria-hidden="true"
										/>
										<span className="text-lg font-medium mx-2 capitalize">
											{t('year')}: {unit.delivery_year}
										</span>
									</h4>
								</div>
								<div>
									<h4 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center">
										<FontAwesomeIcon
											icon={faCalendar}
											className="text-primary text-lg font-medium mr-1"
											aria-hidden="true"
										/>
										<span className="text-lg font-medium mx-2 capitalize">
											{t('month')}: {unit.delivery_month}
										</span>
									</h4>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default function UnitInformation({ unit }: { unit: Unit }) {
	const { t, locale } = useTranslation();

	const { isMobile } = useContext(AppContext);

	return (
		<div className="px-5 py-3 grid grid-cols-1 md:grid-cols-2 items-start">
			<div>
				<div className=" py-6 flex my-3 flex-wrap lg:flex-no-wrap justify-center md:justify-start items-center">
					<button className="flex justify-between items-center py-2 my-2  px-3 mx-2 text-lg font-medium bg-outline-primary rounded-md text-primary">
						<img
							className={clsx('mr-0', locale === 'en' ? 'md:mr-1' : 'md:ml-1')}
							src="/images/call-to-action/message.png"
						/>{' '}
						{isMobile ? '' : t('message')}
					</button>
					<button className="flex justify-between items-center py-3 my-2 px-3 mx-2 text-lg font-medium bg-primary rounded-md text-white">
						<img
							className={clsx('mr-0', locale === 'en' ? 'md:mr-1' : 'md:ml-1')}
							src="/images/call-to-action/phone.png"
						/>{' '}
						{isMobile ? '' : t('call')}
					</button>
					<button className="flex justify-between items-center py-2 my-2  px-3 mx-2 text-lg font-medium bg-outline-primary rounded-md text-primary">
						<img
							className={clsx('mr-0', locale === 'en' ? 'md:mr-1' : 'md:ml-1')}
							src="/images/call-to-action/whatsapp.png"
						/>{' '}
						{isMobile ? '' : t('whatsapp')}
					</button>
					<button className="flex justify-between items-center py-2 my-2  px-3 mx-2 text-lg font-medium bg-outline-primary rounded-md text-primary">
						<img
							className={clsx('mr-0', locale === 'en' ? 'md:mr-1' : 'md:ml-1')}
							src="/images/call-to-action/zoom.png"
						/>{' '}
						{isMobile ? '' : t('zoom')}
					</button>
				</div>
				{unit.description && (
					<div>
						<h3 className="py-2 text-text-secondary font-medium text-2xl">
							{t('description')}
						</h3>
						<p>{unit.description}</p>
					</div>
				)}
			</div>
		</div>
	);
}
