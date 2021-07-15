import { useLazyQuery, useMutation } from "@apollo/client";
import { faHome, faSlidersH, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useContext, useEffect, useState } from "react";
import FinderUnitCard from "../../../components/FinderComponents/FinderPropertySections/FinderUnits/FinderUnitCard";
import FinderLayout from "../../../components/Layouts/FinderLayout";
import { getLocalizationProps } from "../../../Context/LangContext";
import { Unit } from "../../../interfaces";
import { FilterListType } from "../../../interfaces/filters";
import { initializeApollo } from "../../../lib/apolloClient";
import { ALL_UNITS, UNITS_AGGREGATE } from "../../../query/unitsQuery";
import CustomModal from "./../../../components/common/CustomModal/CustomModal";
import LoadingCircle from "./../../../components/common/LoadingCircle";
import FinderSearchFilters from "./../../../components/FinderComponents/FinderPropertySections/FinderUnitFilters/FinderSearchFilters";
import { AppContext } from "./../../../Context/AppContextProvider";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "./../../../query/user";
const FinderExpoPage = ({ units }: { units: any[] }) => {
  // const { t, locale } = useTranslation();
  const [filterListState, setFilterListState] = useState<FilterListType>(
    {} as any
  );
  const { user, setComparing, setLoginModal, filterState, isMobile, isTablet } =
    useContext(AppContext);
  const [innerUnits, setInnerUnits] = useState(units);
  const [showFiltersMenu, setShowFiltersMenu] = useState(false);
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
        compound_id: filterListState.compound_id,
        sk_city_comparison: { _id: filterListState?.sk_city },
        sk_district_comparison: { _id: filterListState?.sk_district },
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
  useEffect(() => {
    setFilterListState({ ...filterState });
  }, [filterState]);
  useEffect(() => {
    console.log("filterListState changed to", filterListState);
    getUnitsAggregate();
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
      console.log(newUnits);
    }
  }, [data?.units_aggregate]);

  const [addWishList] = useMutation(ADD_TO_WISHLIST);
  const [removeWishList] = useMutation(REMOVE_FROM_WISHLIST);

  const wishListHandler = async (unit: Unit, wishlisted: boolean) => {
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
      console.log("u should see a modal man");
      setLoginModal(true);
    }
  };

  const compareHandler = (unit: Unit, wishlisted: boolean) => {
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
  };

  const wishlist_ids = data?.user_wishlist_aggregate.nodes.map(
    (node: any) => node.unit.id
  );

  return (
    <FinderLayout title="Expo page">
      <div
        className={clsx(
          isMobile || (isTablet && "flex justify-end"),
          "mx-4 my-2"
        )}
      >
        {isMobile || isTablet ? (
          <>
            <button
              className="btn-outline-primary bg-outline-red font-public-sans m-0"
              onClick={() => setShowFiltersMenu(true)}
            >
              <FontAwesomeIcon className="mr-2" icon={faSlidersH} />
              Show Filters
            </button>
            <CustomModal
              show={showFiltersMenu}
              onClose={() => setShowFiltersMenu(false)}
              wrapperStyle={{
                position: "absolute",
                top: "0",
                width: "100%",
                transform: "translate(0, 0)",
              }}
            >
              <button
                className="flex justify-end items-center w-full px-2 py-3 text-2xl font-medium text-custom-red"
                onClick={() => setShowFiltersMenu(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <FinderSearchFilters
                setFilterListState={setFilterListState}
                filterListState={filterListState}
                units={units}
              />
              <button
                className={clsx("my-4 btn btn-fnd-primary")}
                onClick={() => setShowFiltersMenu(false)}
              >
                <FontAwesomeIcon className="mr-2" icon={faHome} />
                Show Homes
              </button>
            </CustomModal>
          </>
        ) : (
          <FinderSearchFilters
            setFilterListState={setFilterListState}
            filterListState={filterListState}
            units={units}
          />
        )}
      </div>
      {loading && <LoadingCircle width={"200px"} margin={"5em auto"} />}
      <div className="m-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 gap-y-4 justify-items-start justify-center items-start">
        {!loading &&
          innerUnits &&
          innerUnits.map((unit: Unit) => (
            <FinderUnitCard
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
    </FinderLayout>
  );
};

export default FinderExpoPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const localization = getLocalizationProps(ctx, "common");
  const client = initializeApollo();
  const resp = await client.query({ query: ALL_UNITS });

  let dummyUnits = resp?.data.units;
  let units: Unit[] = [];
  for (let unit in dummyUnits) {
    units.push({ ...dummyUnits[unit], wishListed: false, comparing: false });
  }
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
