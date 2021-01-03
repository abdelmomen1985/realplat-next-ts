import { gql } from '@apollo/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../../../components/Layouts/Layout';
import { getLocalizationProps } from '../../../Context/LangContext';
import { initializeApollo } from '../../../lib/apolloClient';
import Header from './../../../components/Layouts/Header';
import useTranslation from './../../../hooks/useTranslation';
import { allDevelopers } from '../../../query/developers';

export type Developer = {
  name: { ar: string; en: string };
  slug_en: string;
  description: { ar: string; en: string };
  media: any;
  compounds: {
    name: { ar: string; en: string };
    id: string;
  };
};
const DeveloperCard = ({ developer }: { developer: any }) => {
  const { t, locale } = useTranslation();
  return (
    <div className="w-1/3 flex">
      <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg flex-1">
        <img
          className="w-full"
          style={{ maxHeight: '250px' }}
          src={developer.media.card_icon}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <h1 className="text-indigo-800 mb-2"> {developer.name[locale]}</h1>
          <p className="text-gray-700 text-base">
            {developer.description[locale]}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {developer.compounds.map((compound) => {
            return (
              <span
                key={compound.id}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {compound.name[locale]}
              </span>
            );
          })}
        </div>
        <Link
          href={`/${locale}/developers/[developer]`}
          as={`/${locale}` + '/developers/' + developer.id}
        >
          <a className="w-4/5 my-3 mx-auto rounded-sm bg-indigo-800 block text-center font-bold text-lg py-3 px-3 text-white">
            {t('moreAbout')} {developer.name[locale]}
          </a>
        </Link>
      </div>
    </div>
  );
};

const DevelopersPage = ({ developers }: { developers: Developer[] }) => {
  // const { t, locale } = useTranslation();
  return (
    <Layout title="Real Estate Brand">
      <Header />
      <div className="flex flex-wrap ">
        {developers &&
          developers.map((developer: any) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const client = initializeApollo();
  const resp = await client.query({ query: allDevelopers });
  //const { data } = useQuery(allCompounds);
  const developers: Developer[] = resp?.data.developers;
  const localization = getLocalizationProps(ctx, 'common');
  return {
    props: {
      localization,
      developers,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

export default DevelopersPage;
