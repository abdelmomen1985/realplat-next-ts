import Link from 'next/link';
import Layout from '../../components/Layouts/Layout';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Localization } from '../../i18n/types';
import {
  getLocalizationProps,
  LanguageProvider,
} from '../../Context/LangContext';
import useTranslation from '../../hooks/useTranslation';
const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);
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
export default AboutPage;
