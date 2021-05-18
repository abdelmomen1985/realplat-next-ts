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

const ComparePage: NextPage = () => {
  const { comparing, clearComparing, user, setLoginModal } = useContext(
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
  const wishListHandler = async (unit: Unit, wishlisted: Boolean) => {
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
            <div className="grid grid-cols-1 md:grid-cols-3 px-2 mx-auto">
              <div className="py-3 border px-5 rounded-md mx-auto w-full text-center font-bold text-xl bg-primary text-white">
                <h4>{t("prop_type")}</h4>
                <h4>{t("totalPrice")}</h4>
                <h4>{t("pricePerM")}</h4>
                <h4>{t("landArea")}</h4>
                <h4>{t("bua")}</h4>
                <h4>{t("deliveryDate")}</h4>
                <h4>{t("downPay")}</h4>
                <h4>{t("monthlyPay")}</h4>
                <h4>{t("totalYears")}</h4>
                <h4>{t("bedrooms")}</h4>
                <h4>{t("bathrooms")}</h4>
                <h4>{t("location")}</h4>
                <h4>{t("wishList")}</h4>
              </div>
              {comparingUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="py-3 border px-5 rounded-md mx-auto w-full text-center font-bold text-xl text-primary"
                >
                  <h3>{unit.property_type.name[locale]}</h3>
                  <h3>
                    {unit.fin_total} {t("egp")}
                  </h3>
                  <h3>
                    {(unit.fin_total / unit.land).toFixed()}{" "}
                    {t("egp") + "/" + t("meter")}
                    <span className="mSquare">2</span>
                  </h3>
                  <h3>
                    {unit.land} {t("meter")}
                    <span className="mSquare">2</span>
                  </h3>
                  <h3>
                    {unit.bua} {t("meter")}
                    <span className="mSquare">2</span>
                  </h3>
                  <h3>{unit.delivery_year}</h3>
                  <h3>
                    {unit.fin_down_payment} {t("egp")}
                  </h3>
                  <h3>
                    {unit.fin_monthly_payment} {t("egp")}
                  </h3>
                  <h3>
                    {unit.fin_years} {t("years")}
                  </h3>
                  <h3>{unit.bedrooms}</h3>
                  <h3>{unit.bathrooms}</h3>
                  <h3>
                    {" "}
                    {locale === "ar" ? unit.sk_city.name_ar : unit.sk_city.name}
                  </h3>
                  <button
                    onClick={() => wishListHandler(unit, unit.wishListed)}
                    style={{
                      backgroundColor: unit.wishListed ? "#e84118" : "#273c75",
                      color: "#fff",
                      borderRadius: "5px",
                      border: "none",
                      margin: "5px auto",
                      display: "block",
                      padding: "5px 15px",
                      textAlign: "center",
                    }}
                  >
                    {unit.wishListed
                      ? "Remove from WishList"
                      : "Add to Wish List"}
                  </button>
                </div>
                //   <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
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
