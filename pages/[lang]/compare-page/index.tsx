import { useMutation } from "@apollo/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layouts/Layout";
import { AppContext } from "../../../Context/AppContextProvider";
import { getLocalizationProps } from "../../../Context/LangContext";
import useTranslation from "../../../hooks/useTranslation";
import { Unit } from "../../../interfaces/index";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../../../query/user";

import ComparingDesktop from '../../../components/Comparing/ComparingDesktop';
import ComparingMobile from '../../../components/Comparing/ComparingMobile';

const ComparePage: NextPage = () => {
  const { comparing, clearComparing, user, setLoginModal, isMobile } = useContext(
    AppContext
  );

  const [comparingUnits, setComparingUnits] = useState<any[]>(comparing);

  const router = useRouter();
  const { t, locale } = useTranslation();
  const [addWishList] = useMutation(ADD_TO_WISHLIST);
  const [removeWishList] = useMutation(REMOVE_FROM_WISHLIST);
  useEffect(() => {
    if (comparing.length < 2) {
      router.replace(`/${locale}/units`);
    }
    // setComparingUnits(comparing);
    console.log(comparing);
    return () => {
      setComparingUnits([]);
      clearComparing();
      console.log("leaving and clearing", comparing);
    };
  }, []);
  const wishListHandler = async (unit: Unit, wishlisted: boolean) => {
    // handle add to the server
    if (user) {
      unit.wishListed = !wishlisted;
      let wishListedUnit: Unit = { ...unit };
      let dummyUnits = [...comparingUnits];
      dummyUnits = dummyUnits.map((unit) => {
        if (unit.id === wishListedUnit.id) return wishListedUnit;
        return unit;
      });
      setComparingUnits(dummyUnits);
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
    } else {
      setLoginModal(true);
    }
  };
  return (
    <>
      <style jsx>
        {`
          .mSquare {
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline;
            top: -5px;
          }
        `}
      </style>

      <Layout>
        {comparingUnits.length > 0 && (
          <>
            <h3 className="py-3 text-center font-bold text-2xl text-primary">
              Comparing those units
            </h3>
            {isMobile ?
              <ComparingMobile comparingUnits={comparingUnits} wishListHandler={wishListHandler} />
              : <ComparingDesktop comparingUnits={comparingUnits} wishListHandler={wishListHandler} />}
          </>
        )}
      </Layout>
    </>
  );
};
export default ComparePage;
export const getStaticProps: GetStaticProps = async (ctx) => {
  const localization = getLocalizationProps(ctx, "common");
  return {
    props: {
      localization,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["en", "ar"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
