import React, { useEffect, useState, useRef } from 'react';
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
  const [filterListState, setFilterListState] = useState<FilterListType>({});
  const [innerUnits, setInnerUnits] = useState(units);
  const { data, loading } = useQuery(UNITS_AGGREGATE, {
    variables: {
      pt_ids: filterListState.property_types,
      fin_down_payment_min: filterListState?.fin_down_payment?.[0],
      fin_down_payment_max: filterListState?.fin_down_payment?.[1],
      fin_monthly_payment_min: filterListState?.fin_monthly_payment?.[0],
      fin_monthly_payment_max: filterListState?.fin_monthly_payment?.[1],
      fin_total_min: filterListState?.fin_total?.[0],
      fin_total_max: filterListState?.fin_total?.[1],
      fin_years_min: filterListState?.fin_years?.[0],
      fin_years_max: filterListState?.fin_years?.[1],
      sk_city_comparison: { _id: filterListState?.sk_city },
      bedrooms: filterListState?.bedrooms,
      bathrooms: filterListState?.bathrooms,
      land_min: filterListState?.space?.[0],
      land_max: filterListState?.space?.[1],
      finishing_type: filterListState?.finishing_type,
      delivery_year_min: filterListState?.delivery_year,
      delivery_year_max:
        filterListState?.delivery_year === 2023
          ? 2050
          : filterListState?.delivery_year,
    },
    fetchPolicy: 'no-cache',
  });
  const node = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log('filterListState changed to', filterListState);
  }, [filterListState]);

  useEffect(() => {
    if (data?.units_aggregate && data?.units_aggregate.nodes) {
      setInnerUnits(data.units_aggregate.nodes);
    }
    console.log('filtering');
  }, [data?.units_aggregate]);

  /*
  useEffect(() => {
    setInnerUnits([]);
    console.log("ReFetching");
  }, [filterListState]);
  */

  return (
    <LanguageProvider localization={localization}>
      <Layout title="Brand Logo Here">
        <Header />
        <div className="mx-4 my-5" ref={node}>
          <SearchFilters
            setFilterListState={setFilterListState}
            filterListState={filterListState}
            units={units}
          />
        </div>
        <div className="flex flex-wrap ">
          {loading && <div>Loading ...</div>}
          {innerUnits &&
            innerUnits.map((unit: any) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          {innerUnits.length === 0 && !loading && <div>No Units Found</div>}
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
