import Head from "next/head";
import React from "react";
import { getInitialLocale } from "../i18n/getInitialLocale";

const Index: React.FC = () => {
  React.useEffect(() => {
    window.location.replace(`/${getInitialLocale()}`);
    //window.location.replace(`/english`);
  });

  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default Index;
