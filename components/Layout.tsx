import React, { ReactNode, Fragment } from 'react';
import Head from 'next/head';
import Header from './Header & Footer/Header';
import Footer from './Header & Footer/Footer';

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = 'This is the default title',
}: LayoutProps) => (
  <Fragment>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    {children}
    <Footer />
  </Fragment>
);

export default Layout;
