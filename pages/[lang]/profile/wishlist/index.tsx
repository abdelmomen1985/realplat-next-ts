import React, { useContext, useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useMutation, useLazyQuery } from '@apollo/client';
import { getLocalizationProps } from '../../../../Context/LangContext';
import { AppContext } from '../../../../Context/AppContextProvider';
import { useRouter } from 'next/router';
import useTranslation from '../../../../hooks/useTranslation';
import { UnitCard } from '../../../../components/Units/UnitCard';
import { Unit } from '../../../../interfaces/index';
import Layout from './../../../../components/Layouts/Layout';
import { USER_WISHLIST, REMOVE_FROM_WISHLIST } from './../../../../query/user';
import LoadingCircle from './../../../../components/common/LoadingCircle';
export default function WhishList() {
  const [wishListUnitsState, setWishListUnitsState] = useState<Unit[]>([]);
  const { user, setComparing } = useContext(AppContext);
  const [getWishList, { data, refetch, loading }] = useLazyQuery(
    USER_WISHLIST,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const router = useRouter();
  const { t, locale } = useTranslation();

  useEffect(() => {
    // const { user } = useContext(AppContext);
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
      const serverWishListUnits: any = data?.user_wishlist_aggregate.nodes;
      let resolvedUnits = [];
      for (let node in serverWishListUnits) {
        resolvedUnits.push({
          ...serverWishListUnits[node]?.unit,
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
        {loading && <LoadingCircle width={'200px'} margin={'5em auto'} />}
        {wishListUnitsState.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 justify-items-center justify-center items-center">
              {wishListUnitsState.map((unit: any) => {
                return (
                  <UnitCard
                    key={unit.id}
                    unit={unit}
                    wishListHandler={removeFromWishListHandler}
                    compareHandler={compareHandler}
                    wishlisted
                  />
                );
              })}{' '}
            </div>
          </>
        )}
        {!loading && wishListUnitsState.length === 0 && (
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
  const localization = getLocalizationProps(ctx, 'common');
  return {
    props: {
      localization,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
