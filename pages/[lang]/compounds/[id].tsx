import { gql } from '@apollo/client';
// import { url } from 'inspector';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layouts/Layout';
import { getLocalizationProps } from '../../../Context/LangContext';
import { initializeApollo } from '../../../lib/apolloClient';
import { allCompounds, COMPOUNDS_BY_PK } from '../../../query/compounds';
import Header from './../../../components/Layouts/Header';
import useTranslation from './../../../hooks/useTranslation';
import { UnitCard } from './../../../components/Units/UnitCard';
export type Compound = {
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  media: any;
  id: string;
  developer: {
    name: string;
    id: string;
    media: any;
  };
  units: [
    {
      id: string;
      bathrooms: number;
      bedrooms: number;
      bua: number;
      delivery_year: number;
      fin_monthly_payment: number;
      fin_down_payment: number;
      property_type: {
        name: string;
        id: string;
      };
    }
  ];
};
const SingleCompound = ({ compound }: { compound: Compound }) => {
  const { locale } = useTranslation();
  // console.log(window.location.href);
  return (
    <Layout>
      <Header />
      {/* Header */}
      <div className="grid grid-cols-3 gap-10 bg-blue-800 text-white justify-center p-2">
        <div>
          <img src={compound.media.page_icon} className="w-full" />
        </div>
        <div className="col-span-2 justify-center align-middle mt-2 mx-2">
          <h3 className="font-bold text-4xl">{compound.name[locale]}</h3>
          <p className="text-gray-400">{compound.description[locale]}</p>
        </div>
      </div>
      <div className="my-4">
        <h3 className="font-bold text-center text-indigo-800 text-2xl">
          Projects
        </h3>
        <div className="flex flex-wrap ">
          {compound.units.map((unit) => {
            return <UnitCard key={unit.id} unit={unit} />;
          })}
        </div>
      </div>

      <div className="my-5 bg-blue-100 text-white p-5">
        <img
          src={compound.developer.media.card_icon}
          style={{ width: '100px', display: 'block', margin: '10px auto' }}
        />
        <Link
          href={`/${locale}/developers/[developer]`}
          as={`/${locale}` + '/developers/' + compound.developer.id}
        >
          <a className="my-2 mx-auto w-11/12 rounded-md text-indigo-800 bg-indigo-300 font-bold text-xl block text-center py-3 px-3 mb-3">
            {' '}
            See ALL Projects &rarr;
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  let compoundId = ctx.params?.id;
  const client = initializeApollo();
  const resp = await client.query({
    query: COMPOUNDS_BY_PK,
    variables: {
      id: compoundId,
    },
  });
  const compound: Compound = resp?.data.compounds_by_pk;
  const localization = getLocalizationProps(ctx, 'common');
  return {
    props: {
      localization,
      compound,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo();
  const resp = await client.query({ query: allCompounds });
  const compounds: Compound[] = resp?.data.compounds;
  const paths: any[] = [];
  console.log(resp.data.compounds);
  compounds.forEach((compound) => {
    paths.push({ params: { lang: 'ar', id: compound.id } });
    paths.push({ params: { lang: 'en', id: compound.id } });
  });
  return {
    paths,
    fallback: false,
  };
};

export default SingleCompound;
