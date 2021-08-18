import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './finder-nav.module.scss';
import { AnimatePresence } from 'framer-motion';
import useTranslation from './../../../hooks/useTranslation';

const UserDropDown = ({
	show,
	onClose,
	isFinder,
}: {
	show: boolean;
	onClose: () => void;
	isFinder?: boolean;
}) => {
	const { locale, t } = useTranslation();
	const menuRef = useRef<HTMLUListElement | null>(null);
	useEffect(() => {
		//  add when mounted
		document.addEventListener('mousedown', handleClick);
		//  clean on unmount
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
	const handleClick = (e: any) => {
		// clicked inside the modal
		if (menuRef?.current?.contains(e.target)) {
			return;
		}
		// outside the modal
		onClose();
	};
	return (
		<AnimatePresence>
			{show && (
				<ul
					className={clsx(styles.dropDownMenu, 'list-none bg-white')}
					ref={menuRef}
				>
					<li className="my-3 py-1 px-2 mx-auto">
						<Link href={`/${locale}/finder-profile/finder-wishlist`}>
							<a
								onClick={() => onClose()}
								className={clsx(styles.navLink, 'mx-5 flex p-0 m-0')}
							>
								Wishlist
							</a>
						</Link>
					</li>
					<li className="my-3 py-1 px-2 mx-auto">
						<Link href={`/${locale}/finder-profile/finder-settings`}>
							<a
								onClick={() => onClose()}
								className={clsx(
									styles.navLink,
									isFinder ? styles.hoverRed : styles.hoverPrimary,
									'mx-5 flex p-0 m-0'
								)}
							>
								{/** 
                <FontAwesomeIcon
                  icon={faCogs}
                  className="text-primary mx-2"
                  aria-hidden="true"
                />*/}
								Settings
							</a>
						</Link>
					</li>
					<li className="my-3 py-1 px-2 mx-auto">
						<Link href={`/${locale}/finder-profile/finder-wishlist`}>
							<a
								onClick={() => onClose()}
								className={clsx(
									styles.navLink,
									isFinder ? styles.hoverRed : styles.hoverPrimary,
									'mx-5 flex p-0 m-0'
								)}
							>
								{/** 
                <FontAwesomeIcon
                  icon={farBell}
                  className="text-primary mx-2"
                  aria-hidden="true"
                />*/}
								Notifi
							</a>
						</Link>
					</li>
					<li className="my-3 py-1 px-2 mx-auto">
						<Link href={`/${locale}/finder-profile/finder-wishlist`}>
							<a
								onClick={() => onClose()}
								className={clsx(
									styles.navLink,
									isFinder ? styles.hoverRed : styles.hoverPrimary,
									'mx-5 flex p-0 m-0'
								)}
							>
								{/** 
                <FontAwesomeIcon
                  icon={faMoneyBillWave}
                  className="text-primary mx-1"
                  aria-hidden="true"
                />*/}
								{t('Reminders')}
							</a>
						</Link>
					</li>
					<li className="my-3 py-1 px-2 mx-auto">
						<Link href={`/${locale}/finder-profile/finder-wishlist`}>
							<a
								onClick={() => onClose()}
								className={clsx(
									styles.navLink,
									isFinder ? styles.hoverRed : styles.hoverPrimary,
									'mx-5 flex p-0 m-0'
								)}
							>
								{/** 
                <FontAwesomeIcon
                  icon={faLuggageCart}
                  className="mx-2 active-nav-icon text-primary"
                  aria-hidden="true"
                />*/}
								User Units
							</a>
						</Link>
					</li>
					<li className="my-3 py-1 px-2 mx-auto">
						<Link href={`/${locale}/finder-profile/finder-meetings`}>
							<a
								onClick={() => onClose()}
								className={clsx(
									styles.navLink,
									isFinder ? styles.hoverRed : styles.hoverPrimary,
									'mx-5 flex p-0 m-0'
								)}
							>
								{/** 
                <FontAwesomeIcon
                  icon={farHandShake}
                  className="text-primary mx-2"
                  aria-hidden="true"
                />*/}
								Meetings
							</a>
						</Link>
					</li>
				</ul>
			)}
		</AnimatePresence>
	);
};

export default UserDropDown;
