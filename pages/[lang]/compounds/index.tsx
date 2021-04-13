import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../../../components/Layouts/Layout';
import { getLocalizationProps } from '../../../Context/LangContext';
import useTranslation from '../../../hooks/useTranslation';
import { initializeApollo } from '../../../lib/apolloClient';
import { allCompounds } from '../../../query/compounds';
import Header from './../../../components/Layouts/Header';

export type Compound = {
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  media: any;
};

const MyCard = ({ compound }: { compound: any }) => {
  const { locale } = useTranslation();

  return (
    <div className="w-full flex">
      <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg flex-1">
        <img
          className="w-full"
          style={{ maxHeight: '250px' }}
          src={compound.media.card_icon}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <h1 className="text-indigo-800 mb-2"> {compound.name[locale]}</h1>
          <p className="text-gray-700 text-base">
            {compound.description[locale]}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
        <Link
          href={`/${locale}/compounds/[compound]`}
          as={`/${locale}` + '/compounds/' + compound.id}
        >
          <a className="w-4/5 my-3 mx-auto rounded-sm bg-indigo-800 block font-bold text-lg text-center py-3 px-3 text-white">
            Explore
          </a>
        </Link>
      </div>
    </div>
  );
};
const CompoundsPage = ({ compounds }: { compounds: Compound[] }) => {
  return (
    <Layout title="Realstate Brand">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 justify-items-center justify-center items-center">
        {compounds &&
          compounds.map((compound: any) => (
            <MyCard key={compound.name.ar} compound={compound} />
          ))}
      </div>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const client = initializeApollo();
  const resp = await client.query({ query: allCompounds });
  //const { data } = useQuery(allCompounds);
  const compounds: Compound[] = resp?.data.compounds;
  const localization = getLocalizationProps(ctx, 'common');
  return {
    props: {
      localization,
      compounds,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

export default CompoundsPage;
