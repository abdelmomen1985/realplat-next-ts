import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { UnitCard } from "../../../../components/Units/UnitCard";
import { getLocalizationProps } from "../../../../Context/LangContext";
import { Unit } from "../../../../interfaces/index";
import Layout from "./../../../../components/Layouts/Layout";

  useEffect(() => {
    // const { user } = useContext(AppContext);
    console.log(user);
    const getUserWishList = async () => {
      getWishList({ variables: { user_id: user!.id! } });
    };
    // getUserWishList();
    if (user) {
      getUserWishList();
    } else {
      router.replace(`/${locale}/units`);
    }
  }, [user]);

  useEffect(() => {
    if (data?.user_wishlist_aggregate) {
      console.log(data);
      const serverWishListUnits: Unit[] = data?.user_wishlist_aggregate.nodes;
      let resolvedUnits = [];
      for (let node in serverWishListUnits) {
        resolvedUnits.push({
          ...serverWishListUnits[node].unit,
          wishListed: true,
          comparing: false,
        });
      }
      console.log(resolvedUnits);
      setWishListUnitsState(resolvedUnits);
    }
  }, [data]);

  const compareHandler = (unit: Unit, wishlisted: Boolean) => {
    console.log(unit);
    unit.comparing = !unit.comparing;
    let comparedUnit: Unit = { ...unit, wishListed: wishlisted };
    let dummyUnits = [...wishListUnitsState];
    dummyUnits = dummyUnits.map((unit) => {
      if (unit.id === comparedUnit.id) return comparedUnit;
      return unit;
    });
    setComparing(comparedUnit);
    setWishListUnitsState(dummyUnits);
  };

  const [removeWishList] = useMutation(REMOVE_FROM_WISHLIST);

  const removeFromWishListHandler = async (unit: Unit, wishlisted: Boolean) => {
    console.log(unit);
    unit.wishListed = !wishlisted;
    let wishListedUnit: Unit = { ...unit };
    let dummyUnits = [...wishListUnitsState];
    dummyUnits = dummyUnits.map((unit) => {
      if (unit.id === wishListedUnit.id) return wishListedUnit;
      return unit;
    });
    setWishListUnitsState(dummyUnits);
    // handle add to the server
    console.log('unit is WishListed');
    if (user) {
      await removeWishList({
        variables: {
          user_id: user.id,
          unit_id: unit.id,
        },
      });
      if (refetch) refetch();
    }
  };

  return (
    <>
      <Layout>
        <Header />
        {wishListUnitsState.length > 0 ? (
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
            ){" "}
          </>
        ) : (
          <p className="text-center py-5 font-bold text-2xl">
            Nothing has been added to your Wish List yet ... go to Units
          </p>
        )}
      </Layout>
    </>
  );
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  //const client = initializeApollo();

  // const resp = await client.query({ query: ALL_UNITS });
  // //const { data } = useQuery(allCompounds);
  // let dummyUnits = resp?.data.units;
  // let units: Unit[] = [];
  // for (let unit in dummyUnits) {
  //   units.push({ ...dummyUnits[unit], wishListed: false, comparing: false });
  // }
  const localization = getLocalizationProps(ctx, "common");
  return {
    props: {
      localization,
      wishListUnits,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["en", "ar"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
