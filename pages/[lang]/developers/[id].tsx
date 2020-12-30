import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../../../components/Layouts/Layout";
import { getLocalizationProps } from "../../../Context/LangContext";
import { initializeApollo } from "../../../lib/apolloClient";
import Header from "./../../../components/Layouts/Header";
import useTranslation from "./../../../hooks/useTranslation";

function SingleDeveloper() {
  return <div></div>;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const client = initializeApollo();
  const resp = await client.query({ query: allDevelopers });
  //const { data } = useQuery(allCompounds);
  const developers: Developer[] = resp?.data.developers;
  const localization = getLocalizationProps(ctx, "common");
  return {
    props: {
      localization,
      developers,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["en", "ar"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

export default SingleDeveloper;
