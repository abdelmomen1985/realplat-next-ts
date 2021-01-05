import React, { useContext, useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useQuery, useMutation } from '@apollo/client';
import {
  getLocalizationProps,
  LanguageProvider,
} from '../../../../Context/LangContext';
import { AppContext } from '../../../../Context/AppContextProvider';

import { initializeApollo } from '../../../../lib/apolloClient';
import { UnitCard } from '../../../../components/Units/UnitCard';
import { Unit } from '../../../../interfaces/index';
import Layout from './../../../../components/Layouts/Layout';
import { USER_WISHLIST, REMOVE_FROM_WISHLIST } from './../../../../query/user';
import Header from './../../../../components/Layouts/Header';
export default function WhishList({
  wishListUnits,
}: {
  wishListUnits: Unit[];
}) {
  const [wishListUnitsState, setWishListUnitsState] = useState(wishListUnits);
  const { user } = useContext(AppContext);
  let id = user?.id;
  const { data, loading } = useQuery(USER_WISHLIST, {
    variables: { user_id: id },
  });
  useEffect(() => {
    // const { user } = useContext(AppContext);
    console.log(user);
    const getUserWishList = async () => {
      console.log(data?.user_wishlist_aggregate.nodes);
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
    };
    // getUserWishList();
    if (user) {
      getUserWishList();
    }
  }, []);

  const compareHandler = (unit: Unit) => {
    console.log(unit);
  };

  const [removeWishList] = useMutation(REMOVE_FROM_WISHLIST);

  const removeFromWishListHandler = (unit: Unit) => {
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
    console.log('unit is WishListed');
    if (user) {
      removeWishList({
        variables: {
          user_id: user.id,
          unit_id: unit.id,
        },
      });
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
              })}{' '}
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
  const localization = getLocalizationProps(ctx, 'common');
  return {
    props: {
      localization,
      wishListUnits,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
