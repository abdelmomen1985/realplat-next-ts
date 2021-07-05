import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './finder-nav.module.scss';
import classes from '../FinderExpoSections/finderExpo.module.scss';
import useTranslation from './../../../hooks/useTranslation';
import ActiveLink from './../../nav/ActiveLink';
import FinderLocaleSwitcher from './FinderLocaleSwitcher';
const FinderHeader = () => {
	const { t, locale } = useTranslation();
	return (
		<header className={styles.navBar}>
			<Link href={`/${locale}/`}>
				<a
					className={clsx(
						classes.publicsansBoldMirage_26px,
						styles.mellwLogo,
						classes.valignTextMiddle
					)}
				>
					mellw{' '}
				</a>
			</Link>
			<nav className={styles.menu}>
				<div className={styles.lang}>
					{/* <div className={clsx(styles.navLink, 'mx-3')}>
						Eng
					</div> */}
					<FinderLocaleSwitcher />
					<ActiveLink
						href={`/${locale}/finder-expo`}
						activeClassName={styles.active}
					>
						<a className={clsx(styles.navLink, 'mx-3')}>Mellw Expo</a>
					</ActiveLink>

					<ActiveLink href={`/${locale}/help`} activeClassName={styles.active}>
						<a className={clsx(styles.navLink, 'mx-3')}>Help </a>
					</ActiveLink>

					<ActiveLink
						href={`/${locale}/finder-units`}
						activeClassName={styles.active}
					>
						<a className={clsx(styles.navLink, 'mx-3')}>Explore</a>
					</ActiveLink>

					<ActiveLink href={`/${locale}/blog`} activeClassName={styles.active}>
						<a className={clsx(styles.navLink, 'mx-3')}>Blog</a>
					</ActiveLink>
				</div>
			</nav>
			<div className={classes.right}>
				{/* <div className={clsx('mx-2', classes.valignTextMiddle)}>
					<div></div>
				</div> */}
				<button
					className={clsx(
						classes.notosansBoldOutrageousOrange_14px,
						styles.navBtn
					)}
				>
					<img src="/images/finder/user.svg" />
					<span>Sign in</span>
				</button>
				<button className={clsx('ml-4', 'btn', classes.brimaryBtn)}>
					New Exhibitor
				</button>
			</div>
		</header>
	);
};

export default FinderHeader;
