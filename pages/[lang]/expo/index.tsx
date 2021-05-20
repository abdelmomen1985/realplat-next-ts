import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next';
import { getLocalizationProps } from './../../../Context/LangContext';
import Layout from './../../../components/Layouts/Layout';
import MainExpoSection from './../../../components/ExpoSections/MainExpoSection';
import Exhibitors from './../../../components/ExpoSections/Exhibitors';
import HowWorksSection from './../../../components/ExpoSections/HowWorksSection';

const ExpoPage = () => {
  return (
    <Layout title="Expo Page">
      <MainExpoSection />
      <Exhibitors />
      <HowWorksSection />
    </Layout>
  )
}

export default ExpoPage

export const getStaticProps: GetStaticProps = async (ctx) => {
  const localization = getLocalizationProps(ctx, "common");
  return {
    props: {
      localization,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["en", "ar"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};