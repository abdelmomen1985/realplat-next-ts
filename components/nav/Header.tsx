import Link from 'next/link';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLinks } from './NavLinks';
import AuthModal from '../Auth/AuthModal';
import { AppContext } from '../../Context/AppContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
	const { loginModal, setLoginModal } = useContext(AppContext);
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
			<header className="relative my-2 p-2 pb-4">
				<div style={{ bottom: '0', width: '100%' }}>
					<nav className="container px-5 flex flex-row justify-between ">
						<h1
							className="text-bold text-2xl p-0.5 cursor-pointer"
							style={{ padding: '0.125rem' }}
						>
							<Link href="/">
								<img src="/images/mellw.png" alt="Mellw" />
							</Link>
						</h1>
						<div
							ref={mobileMenu}
							className={
								'pt-2 hidden lg:flex flex-wrap lg:flex-row flex-col justify-between  w-full ' +
								(isMobileMenuOpen ? 'mobile-menu ' : '')
							}
						>
							<NavLinks setLoginModal={setLoginModal} />
						</div>

						<div className="cursor-pointer block lg:hidden bg-transparent border-none focus:outline-none outline-none">
							<FontAwesomeIcon
								className=" text-black font-medium text-lg hover:text-primary"
								icon={faBars}
								onClick={() => {
									setIsMobileMenuOpen((prev) => !prev);
								}}
							/>
						</div>
					</nav>
				</div>
			</header>
			{loginModal && <AuthModal setLoginModal={setLoginModal} />}
		</>
	);
}
export default Header;
