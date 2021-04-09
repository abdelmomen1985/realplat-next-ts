import { useQuery } from "@apollo/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/Layouts/Header";
import Layout from "../../../components/Layouts/Layout";
import { UnitCard } from "../../../components/Units/UnitCard";
import {
  getLocalizationProps,
  LanguageProvider,
} from "../../../Context/LangContext";
import { Localization } from "../../../i18n/types";
import { FilterListType } from "../../../interfaces/filters";
import { Unit } from "../../../interfaces/index";
import { initializeApollo } from "../../../lib/apolloClient";
import { ALL_UNITS, UNITS_AGGREGATE } from "../../../query/unitsQuery";
import SearchFilters from "./../../../components/SearchFilters/SearchFilters";

const UnitsPage: NextPage<{
  units: Unit[];
  localization: Localization;
}> = ({ units, localization }) => {
  const [filterListState, setFilterListState] = useState<FilterListType>(
    {} as any
  );
  const [innerUnits, setInnerUnits] = useState(units);
  const [getUnitsAgg, { data, refetch, loading }] = useLazyQuery(
    UNITS_AGGREGATE,
    {
      fetchPolicy: "no-cache",
    }
  );
  const getUnitsAggregate = async () => {
    getUnitsAgg({
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
        user_id:
          user?.id && user.id.length > 0
            ? user?.id
            : "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      },
    });
  };
  useEffect(() => {
    getUnitsAggregate();
  }, []);
  const node = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("filterListState changed to", filterListState);
  }, [filterListState]);

  useEffect(() => {
    if (data?.units_aggregate && data?.units_aggregate.nodes) {
      let dummyUnits = data?.units_aggregate.nodes;
      let newUnits: Unit[] = [];
      for (let unit in dummyUnits) {
        newUnits.push({
          ...dummyUnits[unit],
          wishListed: false,
          comparing: false,
        });
      }
      setInnerUnits(newUnits);
      console.log("filtering");
    }
  }, [data?.units_aggregate]);

  const [addWishList] = useMutation(ADD_TO_WISHLIST);
  const [removeWishList] = useMutation(REMOVE_FROM_WISHLIST);

  const wishListHandler = async (unit: Unit, wishlisted: Boolean) => {
    // handle add to the server
    if (user) {
      unit.wishListed = !wishlisted;
      let wishListedUnit: Unit = { ...unit };
      let dummyUnits = [...innerUnits];
      dummyUnits = dummyUnits.map((unit) => {
        if (unit.id === wishListedUnit.id) return wishListedUnit;
        return unit;
      });
      setInnerUnits(dummyUnits);
      console.log(innerUnits);
      if (wishListedUnit.wishListed) {
        await addWishList({
          variables: {
            user_id: user.id,
            unit_id: unit.id,
          },
        });
      } else {
        await removeWishList({
          variables: {
            user_id: user.id,
            unit_id: unit.id,
          },
        });
      }
      if (refetch) refetch();
    } else {
      setLoginModal(true);
    }
  };
  const compareHandler = (unit: any, wishlisted: Boolean) => {
    console.log(unit);
    unit.comparing = !unit.comparing;
    let comparedUnit: Unit = { ...unit, wishListed: wishlisted };
    let dummyUnits = [...innerUnits];
    dummyUnits = dummyUnits.map((unit) => {
      if (unit.id === comparedUnit.id) return comparedUnit;
      return unit;
    });
    setComparing(comparedUnit);
    setInnerUnits(dummyUnits);
    console.log(innerUnits);
    if (wishListedUnit.wishListed) {
      // handle add to the server
      console.log("unit is WishListed");
    } else {
      // handle removal from server
      console.log("unit is removed from WishList");
    }
  };
  const compareHandler = (unit: any) => {
    console.log(unit);
  };
  /*
  useEffect(() => {
    setInnerUnits([]);
    console.log("ReFetching");
  }, [filterListState]);
  */
  const wishlist_ids = data?.user_wishlist_aggregate.nodes.map(
    (node: any) => node.unit.id
  );

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
              <UnitCard
                key={unit.id}
                unit={unit}
                wishListHandler={wishListHandler}
                compareHandler={compareHandler}
                wishlisted={
                  wishlist_ids?.filter((id: any) => id === unit.id).length > 0
                }
              />
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

  let dummyUnits = resp?.data.units;
  let units: Unit[] = [];
  for (let unit in dummyUnits) {
    units.push({ ...dummyUnits[unit], wishListed: false, comparing: false });
  }
  const localization = getLocalizationProps(ctx, "common");
  return {
    props: {
      localization,
      units,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["en", "ar"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
export default UnitsPage;
