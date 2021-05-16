import { useEffect, useState } from 'react';
import Layout from '../../components/Layouts/Layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getLocalizationProps } from '../../Context/LangContext';
// import useTranslation from '../../hooks/useTranslation';
import MainSection from './../../components/HomeSections/MainSection';
import ServicesSection from './../../components/HomeSections/ServicesSection';
import ExplorerSection from './../../components/HomeSections/ExplorerSection';
import GuidesSection from './../../components/HomeSections/GuidesSection';

const IndexPage: NextPage = () => {
  // const { t } = useTranslation();


  return (
    <Layout title="Realestate Brand">
      {/* top section */}
      <MainSection />
      {/* services section   */}
      <ServicesSection />
      {/* explorer section */}
      <ExplorerSection />
      {/* guides section */}
      <GuidesSection />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const localization = getLocalizationProps(ctx, 'common');
  return {
    props: {
      localization,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
export default IndexPage;
