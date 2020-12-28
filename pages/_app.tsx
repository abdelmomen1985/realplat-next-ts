import '../styles/index.css';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import { LanguageProvider } from '../Context/LangContext';
import '@fortawesome/fontawesome-free/css/all.css';

export default function MyApp({ Component, pageProps }: any) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <LanguageProvider localization={pageProps.localization}>
        <Component {...pageProps} />
      </LanguageProvider>
    </ApolloProvider>
  );
}
