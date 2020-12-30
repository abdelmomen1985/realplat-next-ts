import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import Layout from '../../../components/Layouts/Layout';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';

import { Localization } from '../../../i18n/types';
import {
  getLocalizationProps,
  LanguageProvider,
} from '../../../Context/LangContext';
import Header from '../../../components/Layouts/Header';
import { Unit } from '../../../interfaces/index';
import SearchFilters from './../../../components/SearchFilters/SearchFilters';
import { UnitCard } from '../../../components/Units/UnitCard';
import { FilterListType } from '../../../interfaces/filters';
import { ALL_UNITS, UNITS_AGGREGATE } from '../../../query/unitsQuery';

const UnitsPage: NextPage<{
  units: Unit[];
  localization: Localization;
}> = ({ units, localization }) => {
  const [filterListState, setFilterListState] = useState<FilterListType>({
    property_types: [],
  });

  const [innerUnits, setInnerUnits] = useState(units);
  const { data } = useQuery(UNITS_AGGREGATE, {
    variables: { pt_ids: filterListState.property_types },
  });

  useEffect(() => {
    if (data?.units_aggregate && data?.units_aggregate.nodes.length > 0) {
      setInnerUnits(data.units_aggregate.nodes);
    }
  }, [data?.units_aggregate]);

  return (
    <LanguageProvider localization={localization}>
      <Layout title="Brand Logo Here">
        <Header />
        <div className="mx-4 my-5">
          <SearchFilters
            setFilterListState={setFilterListState}
            filterListState={filterListState}
            units={units}
          />
        </div>
        <div className="flex flex-wrap ">
          {innerUnits &&
            innerUnits.map((unit: any) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
        </div>
      </Layout>
    </LanguageProvider>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const client = initializeApollo();
  const resp = await client.query({ query: ALL_UNITS });
  //const { data } = useQuery(allCompounds);
  const units: Unit[] = resp?.data.units;
  console.log(resp?.data);
  const localization = getLocalizationProps(ctx, 'common');
  return {
    props: {
      localization,
      units,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
export default UnitsPage;
