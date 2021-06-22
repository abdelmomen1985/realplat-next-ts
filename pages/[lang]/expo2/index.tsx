import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { getLocalizationProps } from "./../../../Context/LangContext";

export default function Expo2() {
  return <div>Expo</div>;
}

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
