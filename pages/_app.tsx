import "../styles/index.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

export default function MyApp({ Component, pageProps }: any) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
