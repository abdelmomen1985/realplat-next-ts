import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import useTranslation from './../../../hooks/useTranslation';

import styles from './finder-nav.module.scss';
import classes from '../FinderExpoSections/finderExpo.module.scss';

const FinderFooter = () => {
	const { t, locale } = useTranslation();
	return (
		<footer
			className="w-full mt-5 mb-0"
			style={{
				backgroundColor: '#f5f4f8',
			}}
		>
			<section className="grid grid-cols-1 md:grid-cols-5 gap-4 p-8 mx-0 my-2 font-noto-sans">
				<div>
					<Link href={`/${locale}/`}>
						<a
							className={clsx(
								classes.publicsansBoldMirage_26px,
								styles.mellwLogo,
								classes.valignTextMiddle,
								'mb-5'
							)}
						>
							mellw{' '}
						</a>
					</Link>
					<div
						className="flex justify-start my-2 items-center font-noto-sans text-base font-normal"
						style={{
							color: '#454056',
						}}
					>
						<img src="/images/icons/email.svg" />
						<span className="mx-2">example@email.com</span>
					</div>
					<div
						className="flex justify-start my-2 items-center font-noto-sans text-base font-normal"
						style={{
							color: '#454056',
						}}
					>
						<img src="/images/icons/phone.svg" />
						<span className="mx-2">(406) 555-0120</span>
					</div>
				</div>
				<div>
					<h3 className="text-gray-900 text-lg font-bold mb-3">Quick Links</h3>
					<ul>
						<li className="my-2">
							<Link href={`/${locale}/`}>
								<a
									className=" font-noto-sans text-base font-normal"
									style={{
										color: '#454056',
									}}
								>
									Buy a property
								</a>
							</Link>
						</li>
						<li className="my-2">
							<Link href={`/${locale}/`}>
								<a
									className=" font-noto-sans text-base font-normal"
									style={{
										color: '#454056',
									}}
								>
									Sell a property
								</a>
							</Link>
						</li>
						<li className="my-2">
							<Link href={`/${locale}/`}>
								<a
									className=" font-noto-sans text-base font-normal"
									style={{
										color: '#454056',
									}}
								>
									Rent a property
								</a>
							</Link>
						</li>
						<li className="my-2">
							<Link href={`/${locale}/`}>
								<a
									className=" font-noto-sans text-base font-normal"
									style={{
										color: '#454056',
									}}
								>
									Calculate your property
								</a>
							</Link>
						</li>
						<li className="my-2">
							<Link href={`/${locale}/`}>
								<a
									className=" font-noto-sans text-base font-normal"
									style={{
										color: '#454056',
									}}
								>
									Top Offers
								</a>
							</Link>
						</li>
						<li className="my-2">
							<Link href={`/${locale}/`}>
								<a
									className=" font-noto-sans text-base font-normal"
									style={{
										color: '#454056',
									}}
								>
									Top Cities
								</a>
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<h3 className="text-gray-900 text-lg font-bold mb-3">About</h3>
					<ul>
						<li className="my-2">
							<Link href={`/${locale}/`}>
								<a
									className=" font-noto-sans text-base font-normal"
									style={{
										color: '#454056',
									}}
								>
									About Us
								</a>
							</Link>
						</li>
						<li className="my-2">
							<Link href={`/${locale}/`}>
								<a
									className=" font-noto-sans text-base font-normal"
									style={{
										color: '#454056',
									}}
								>
									Our Agents
								</a>
							</Link>
						</li>
						<li className="my-2">
							<Link href={`/${locale}/`}>
								<a
									className=" font-noto-sans text-base font-normal"
									style={{
										color: '#454056',
									}}
								>
									Help & Support
								</a>
							</Link>
						</li>
						<li className="my-2">
							<Link href={`/${locale}/`}>
								<a
									className=" font-noto-sans text-base font-normal"
									style={{
										color: '#454056',
									}}
								>
									Contact
								</a>
							</Link>
						</li>
						<li className="my-2">
							<Link href={`/${locale}/`}>
								<a
									className=" font-noto-sans text-base font-normal"
									style={{
										color: '#454056',
									}}
								>
									News
								</a>
							</Link>
						</li>
					</ul>
				</div>
				<div className="col-span-1 md:col-span-2">
					<h3 className="text-gray-900 text-lg font-bold mb-3">
						Featured News
					</h3>
					<div className="flex justify-start items-start my-3">
						<img className="mx-2 rounded-md" src="/images/footer-1.png" />
						<div className="mx-2">
							<h4 className="text-base font-noto-sans font-normal mb-2 text-red capitalize">
								home improvement
							</h4>
							<h2
								className="text-lg font-semibold my-2 capitalize"
								style={{
									color: '#454056',
								}}
							>
								Your Guide to a Smart Apartment Searching
							</h2>
							<p
								className="my-1 text-base font-normal"
								style={{
									color: '#666276',
								}}
							>
								Mi justo, varius vitae cursus ipsum sem massa amet pellentesque.
								Ipsum enim sit nulla ridiculus semper nam...
							</p>
							<div className="flex justify-start items-center">
								<div className="flex justify-start items-center mx-2">
									<img src="/images/icons/calender.svg" className="mx-1" />
									<span
										className="text-base font-normal font-noto-sans"
										style={{
											color: '#666276',
										}}
									>
										Dec 4
									</span>
								</div>
								<div className="flex justify-start items-center mx-2">
									<img src="/images/icons/comments.svg" className="mx-1" />
									<span
										className="text-base font-normal font-noto-sans"
										style={{
											color: '#666276',
										}}
									>
										2 comments
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-start items-start my-3">
						<img className="mx-2 rounded-md" src="/images/footer-2.png" />
						<div className="mx-2">
							<h4 className="text-base font-noto-sans font-normal mb-2 text-red capitalize">
								tips & advice
							</h4>
							<h2
								className="text-lg font-semibold my-2 capitalize"
								style={{
									color: '#454056',
								}}
							>
								Top 10 Ways to Refresh Your Space
							</h2>
							<p
								className="my-1 text-base font-normal"
								style={{
									color: '#666276',
								}}
							>
								Volutpat, orci, vitae arcu feugiat vestibulum ultricies nisi,
								aenean eget. Vitae enim, tellus tempor consequat mi vitae...
							</p>
							<div className="flex justify-start items-center">
								<div className="flex justify-start items-center mx-2">
									<img src="/images/icons/calender.svg" className="mx-1" />
									<span
										className="text-base font-normal font-noto-sans"
										style={{
											color: '#666276',
										}}
									>
										24 Nov
									</span>
								</div>
								<div className="flex justify-start items-center mx-2">
									<img src="/images/icons/comments.svg" className="mx-1" />
									<span
										className="text-base font-normal font-noto-sans"
										style={{
											color: '#666276',
										}}
									>
										no comments
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section
				className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-8 font-noto-sans rounded-t-md"
				style={{
					backgroundColor: '#1F1B2D',
				}}
			>
				<div className="relative">
					<img src="/images/application.png" className={styles.footerApp} />
				</div>
				<div>
					<h3 className="text-white text-xl font-bold font-noto-sans mb-4`">
						Download Our App
					</h3>
					<p className="text-white text-sm font-thin my-3 font-noto-sans">
						Find everything you need for buying, selling & renting property in
						our new Finder App!
					</p>
				</div>
				<div className="flex justify between items-center">
					<button className="bg-transparent border-transparent mx-2">
						<img className="w-full h-full" src="/images/app-store.png" />
					</button>
					<button className="bg-transparent border-transparent mx-2">
						<img className="w-full h-full" src="/images/google-play.png" />
					</button>
				</div>
			</section>
		</footer>
	);
};

export default FinderFooter;
