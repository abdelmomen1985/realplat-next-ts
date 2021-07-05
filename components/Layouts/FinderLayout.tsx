import React, { ReactNode } from 'react';
import Head from 'next/head';
import useTranslation from './../../hooks/useTranslation';
import FinderHeader from './../FinderComponents/FinderNavigation/FinderHeader';
import FinderFooter from './../FinderComponents/FinderNavigation/FinderFooter';
type LayoutProps = {
	children?: ReactNode;
	title?: string;
};

const FinderLayout = ({
	children,
	title = 'This is the default title',
}: LayoutProps) => {
	const { locale } = useTranslation();
	return (
		<>
			<style jsx>
				{`
					.expo2 {
						max-width: 1024px;
						margin: 0 auto;
						overflow: hidden;
					}
				`}
			</style>
			<div style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
				<Head>
					<title>{title}</title>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>
				<FinderHeader />
				{children}

				<FinderFooter />
			</div>
		</>
	);
};

export default FinderLayout;
