import React, { useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getLocalizationProps } from "../../Context/LangContext";
// import useTranslation from '../../hooks/useTranslation';
import MainSection from "./../../components/HomeSections/MainSection";
import ServicesSection from "./../../components/HomeSections/ServicesSection";
import ExplorerSection from "./../../components/HomeSections/ExplorerSection";
import GuidesSection from "./../../components/HomeSections/GuidesSection";
import Exhibitors from "../../components/ExpoSections/Exhibitors";
import HowWorksSection from "../../components/ExpoSections/HowWorksSection";
import MainExpoSection from "../../components/ExpoSections/MainExpoSection";

const IndexPage: NextPage = () => {
  // const { t } = useTranslation();

  // just refresh the heroku api
  useEffect(() => {
    fetch("https://hubgraph.herokuapp.com/").then(() => {
      console.log("hubgraph fetched");
    });
  }, []);
  return (
    <Layout title="Realestate Brand">
      {/* top section 
      <MainSection />
      <ServicesSection />
      <ExplorerSection />
      <GuidesSection />
      */}
      <MainExpoSection />
      <Exhibitors />
      <HowWorksSection />
    </Layout>
  );
};

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
export default IndexPage;
