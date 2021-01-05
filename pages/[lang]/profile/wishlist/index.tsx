import React, { useContext, useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { useMutation, useLazyQuery } from "@apollo/client";
import { getLocalizationProps } from "../../../../Context/LangContext";
import { AppContext } from "../../../../Context/AppContextProvider";

import { UnitCard } from "../../../../components/Units/UnitCard";
import { Unit } from "../../../../interfaces/index";
import Layout from "./../../../../components/Layouts/Layout";
import { USER_WISHLIST, REMOVE_FROM_WISHLIST } from "./../../../../query/user";
import Header from "./../../../../components/Layouts/Header";
export default function WhishList({
  wishListUnits,
}: {
  wishListUnits: Unit[];
}) {
  const [wishListUnitsState, setWishListUnitsState] = useState(wishListUnits);
  const { user } = useContext(AppContext);
  const [getWishList, { data, refetch }] = useLazyQuery(USER_WISHLIST, {
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    // const { user } = useContext(AppContext);
    console.log(user);
    const getUserWishList = async () => {
      getWishList({ variables: { user_id: user!.id! } });
    };
    // getUserWishList();
    if (user) {
      getUserWishList();
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

  const compareHandler = (unit: Unit) => {
    console.log(unit);
  };

  const [removeWishList] = useMutation(REMOVE_FROM_WISHLIST);

  const removeFromWishListHandler = async (unit: Unit) => {
    console.log(unit);
    unit.wishListed = !unit.wishListed;
    let wishListedUnit: Unit = { ...unit };
    let dummyUnits = [...wishListUnitsState];
    dummyUnits = dummyUnits.map((unit) => {
      if (unit.id === wishListedUnit.id) return wishListedUnit;
      return unit;
    });
    setWishListUnitsState(dummyUnits);
    // handle add to the server
    console.log("unit is WishListed");
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
            <div className="flex flex-wrap ">
              {wishListUnitsState.map((unit: any) => {
                return (
                  <UnitCard
                    key={unit.id}
                    unit={unit}
                    wishListHandler={removeFromWishListHandler}
                    compareHandler={compareHandler}
                  />
                );
              })}{" "}
            </div>
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
  const wishListUnits: any = [];
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
