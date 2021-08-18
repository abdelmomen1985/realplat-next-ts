import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useRef, useState, useContext } from 'react';
import classes from '../FinderExpoSections/finderExpo.module.scss';
import useTranslation from './../../../hooks/useTranslation';
import styles from './finder-nav.module.scss';
import FinderNavLinks from './FinderNavLinks';
import { AppContext } from './../../../Context/AppContextProvider';
import FinderAuthModal from '../FinderAuth/FinderAuthModal';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import UserDropDown from './UserDropDown';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { shortenName } from './../../../utils/shortenName';
const FinderHeader = () => {
	const { locale, t } = useTranslation();
	const { setFinderLoginModal, finderLoginModal, user, setUser } =
		useContext(AppContext);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
	const mobileMenu = useRef<HTMLDivElement>(null);
	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth > 1023) {
				setIsMobileMenuOpen(false);
			}
		});

		return () => {
			window.removeEventListener('resize', () => setIsMobileMenuOpen(false));
		};
	}, []);
	useEffect(() => {
		// add when mounted
		document.addEventListener('mousedown', handleClick);
		// return function to be called when unmounted
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
	const handleClick = (e: any) => {
		if (mobileMenu?.current?.contains(e.target)) {
			// inside click
			return;
		}
		// outside click
		setIsMobileMenuOpen(false);
	};
	return (
		<>
			<header className={clsx(styles.navBar, 'relative ')}>
				<nav className={styles.menu}>
					<Link href={`/${locale}/`}>
						<a
							className={clsx(
								classes.publicsansBoldMirage_26px,
								styles.mellwLogo,
								classes.valignTextMiddle,
								'md:m-0 m-4'
							)}
						>
							mellw{' '}
						</a>
					</Link>
					<div
						ref={mobileMenu}
						className={
							'pt-2 hidden lg:flex flex-wrap lg:flex-row flex-col justify-between w-full' +
							(isMobileMenuOpen ? ' mobile-menu ' : '')
						}
					>
						<FinderNavLinks />
					</div>

					<div className="cursor-pointer block lg:hidden bg-transparent border-none focus:outline-none outline-none">
						<FontAwesomeIcon
							className="font-medium text-lg m-4 fnd-primary"
							icon={faBars}
							onClick={() => {
								setIsMobileMenuOpen((prev) => !prev);
							}}
						/>
					</div>
				</nav>
				<div className={clsx(styles.right)}>
					{!user?.id ? (
						<a
							className={clsx(
								classes.notosansBoldOutrageousOrange_14px,
								styles.navBtn
							)}
							onClick={() => setFinderLoginModal(true)}
						>
							<img src="/images/finder/user.svg" />
							{t('navSign')}
						</a>
					) : (
						<div className="flex justify-center items-center mt-2">
							<Link href={`/${locale}/finder-profile/finder-wishlist`}>
								<a className={clsx(styles.navLink, 'mx-1')}>
									<FontAwesomeIcon
										icon={faHeart}
										className="text-custom-red mx-1"
										aria-hidden="true"
									/>{' '}
									{t('navWishList')}
								</a>
							</Link>

							<span className="relative">
								<a
									className={clsx(styles.navLink, 'mx-1')}
									onClick={() => setIsUserMenuOpen(true)}
								>
									<FontAwesomeIcon
										icon={farUser}
										className="mx-1"
										aria-hidden="true"
									/>{' '}
									{user?.name && shortenName(user?.name)}
								</a>
								<UserDropDown
									show={isUserMenuOpen}
									onClose={() => setIsUserMenuOpen(false)}
								/>
							</span>

							<a
								className={clsx(styles.navLink, 'mx-1 cursor-pointer')}
								onClick={async () => {
									const response = await fetch('/api/sessions', {
										method: 'DELETE',
										headers: { 'Content-Type': 'application/json' },
									});
									if (response.status === 204) setUser(undefined);
								}}
							>
								{t('navSignOut')}
							</a>
						</div>
					)}
					<button className={clsx('my-4 btn btn-fnd-primary mt-6')}>
						New Exhibitor
					</button>
				</div>
			</header>
			{finderLoginModal && <FinderAuthModal />}
		</>
	);
};

export default FinderHeader;
