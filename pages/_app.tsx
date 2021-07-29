import { ApolloProvider } from "@apollo/client";
import "@fortawesome/fontawesome-free/css/all.css";
import React from "react";
import "react-day-picker/lib/style.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { AppContextProvider } from "../Context/AppContextProvider";
import { LanguageProvider } from "../Context/LangContext";
import { getInitialLocale } from "../i18n/getInitialLocale";
import { useApollo } from "../lib/apolloClient";
import "../styles/index.css";

export default function MyApp(ctx: any) {
  // TODO remove
  React.useEffect(() => {
    window.location.replace(`/${getInitialLocale()}`);
    //window.location.replace(`/english`);
  });
  const apolloClient = useApollo(ctx.pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>
        <LanguageProvider localization={ctx.pageProps.localization}>
          <ctx.Component {...ctx.pageProps} />
        </LanguageProvider>
      </AppContextProvider>
    </ApolloProvider>
  );
}
