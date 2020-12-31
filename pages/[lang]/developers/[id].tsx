import { gql } from '@apollo/client';
// import { url } from 'inspector';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layouts/Layout';
import { getLocalizationProps } from '../../../Context/LangContext';
import { initializeApollo } from '../../../lib/apolloClient';
import { GET_DEVELOPER_BY_PK, allDevelopers } from '../../../query/developers';
import Header from './../../../components/Layouts/Header';
import useTranslation from './../../../hooks/useTranslation';

export type Developer = {
  name: { ar: string; en: string };
  id: string;
  slug_en: string;
  description: { ar: string; en: string };
  media: any;
  compounds: [
    {
      name: { ar: string; en: string };
      id: string;
      media: any;
      description: { ar: string; en: string };
    }
  ];
};
const CompoundCard = ({ compound }: { compound: any }) => {
  const developerHandler = (id) => {
    console.log(id);
  };
  console.log(compound);
  const { locale } = useTranslation();
  return (
    <div className="w-1/3 flex">
      <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg flex-1">
        <img
          className="w-full"
          style={{ maxHeight: '350px' }}
          src={compound.media.page_icon}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <h1 className="text-indigo-800 mb-2"> {compound.name[locale]}</h1>
          {compound.description && (
            <p className="text-gray-700 text-base">
              {compound.description[locale]}
            </p>
          )}
        </div>
        <Link
          href={`/${locale}/compounds/[compound]`}
          as={`/${locale}` + '/compounds/' + compound.id}
        >
          <a className="w-4/5 my-3 mx-auto rounded-sm bg-indigo-800 font-bold text-lg block text-center py-3 px-3 text-white">
            Explore
          </a>
        </Link>
      </div>
    </div>
  );
};

const SingleDeveloper = ({ developer }: { developer: Developer }) => {
  const { locale } = useTranslation();
  // console.log(window.location.href);
  return (
    <Layout>
      <Header />
      {/* Header */}
      <div className="grid grid-cols-3 gap-10 bg-blue-800 text-white justify-center p-2">
        <div>
          <img src={developer.media.page_icon} className="w-full" />
        </div>
        <div className="col-span-2 justify-center align-middle mt-2 mx-2">
          <h3 className="font-bold text-4xl">{developer.name[locale]}</h3>
          <p className="text-gray-400">{developer.description[locale]}</p>
        </div>
      </div>
      <div className="my-4">
        <h3 className="font-bold text-center text-indigo-800 text-2xl">
          Projects
        </h3>
        <div className="flex flex-wrap ">
          {developer.compounds.map((compound) => {
            return <CompoundCard key={compound.id} compound={compound} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const router = useRouter();

  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  let devId = ctx.params?.id;
  // console.log(developerId);
  const client = initializeApollo();
  const resp = await client.query({
    query: GET_DEVELOPER_BY_PK,
    variables: {
      id: devId,
    },
  });
  const developer: Developer = resp?.data.developers_by_pk;

  const localization = getLocalizationProps(ctx, 'common');
  // const devID = router.query.developer;
  // console.log(devID);
  return {
    props: {
      localization,
      developer,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo();
  const resp = await client.query({ query: allDevelopers });
  const developers: Developer[] = resp?.data.developers;
  const paths: any[] = [];
  developers.forEach((developer) => {
    paths.push({ params: { lang: 'ar', id: developer.id } });
    paths.push({ params: { lang: 'en', id: developer.id } });
  });
  return {
    paths,
    fallback: false,
  };
};

export default SingleDeveloper;
