import React from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useQuery } from '@apollo/client';
import {
  getLocalizationProps,
  LanguageProvider,
} from '../../../../Context/LangContext';
import { initializeApollo } from '../../../../lib/apolloClient';
import { UnitCard } from '../../../../components/Units/UnitCard';
import { Unit } from '../../../../interfaces/index';
import Layout from './../../../../components/Layouts/Layout';

export default function WhishList(props: any) {
  const compareHandler = (unit: any) => {
    console.log(unit);
  };
  const wishListHandler = (unit: any) => {
    console.log(unit);
  };
  return (
    <>
      <Layout>
        {props.units ? (
          <>
            (
            {props.units.map((unit: Unit) => {
              return (
                <UnitCard
                  key={unit.id}
                  unit={unit}
                  wishListHandler={wishListHandler}
                  compareHandler={compareHandler}
                />
              );
            })}
            ){' '}
          </>
        ) : (
          <p>Nothing has been added to your Wish List yet</p>
        )}
      </Layout>
    </>
  );
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const client = initializeApollo();
  // const resp = await client.query({ query: ALL_UNITS });
  // //const { data } = useQuery(allCompounds);
  // let dummyUnits = resp?.data.units;
  // let units: Unit[] = [];
  // for (let unit in dummyUnits) {
  //   units.push({ ...dummyUnits[unit], wishListed: false, comparing: false });
  // }
  const localization = getLocalizationProps(ctx, 'common');
  return {
    props: {
      localization,
      // units,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
