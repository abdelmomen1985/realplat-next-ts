import React from "react";
import useTranslation from "../../hooks/useTranslation";
import Carousel from "react-elastic-carousel";
import { useRouter } from "next/router";

export const UnitCard = ({
  unit,
  wishListHandler,
  compareHandler,
  wishlisted,
}: {
  unit: any;
  wishListHandler: (val: any, val2: any) => void;
  compareHandler: (val: any, val2: any) => void;
  wishlisted: boolean;
}) => {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const singleUnitHandler = (unitId: string) => {
    router.push(`/${locale}/units/[unit]/`, `/${locale}/units/${unitId}/`, {
      shallow: true,
    });
  };

  return (
    <div className="w-1/3 flex">
      <div
        className={
          "m-2 max-w-sm rounded-md overflow-hidden shadow-lg flex-1 relative " +
          (unit.comparing ? "bg-blue-600" : "bg-white")
        }
      >
        <div className="relative">
          <Carousel
            pagination={false}
            showArrows={false}
            enableAutoPlay={true}
            autoPlaySpeed={1000}
          >
            {unit.media.map((image: any, key: any) => {
              return (
                <img
                  key={key}
                  className="w-full"
                  style={{ maxHeight: "250px" }}
                  src={image}
                  alt="unit image"
                />
              );
            })}
          </Carousel>
          <div
            className="absolute flex justify-between text-sm"
            style={{ bottom: "50px", width: "100%" }}
          >
            <div
              className="bg-transparent rounded-md p-3 text-black-500"
              style={{ left: "15px", position: "absolute" }}
            >
              {wishlisted ? (
                <span
                  className="cursor-pointer"
                  onClick={() => wishListHandler(unit, wishlisted)}
                >
                  <i
                    className="fas fa-heart"
                    style={{ color: "white", fontSize: "18px" }}
                    aria-hidden="true"
                  ></i>
                </span>
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={() => wishListHandler(unit, wishlisted)}
                >
                  <i
                    className="far fa-heart"
                    style={{ color: "white", fontSize: "18px" }}
                    aria-hidden="true"
                  ></i>
                </span>
              )}
            </div>
            <div
              className="bg-blue-900 rounded-md p-3 text-white"
              style={{ right: "15px", position: "absolute" }}
            >
              {!unit.comparing ? (
                <span
                  className="cursor-pointer"
                  onClick={() => compareHandler(unit, wishlisted)}
                >
                  <i className="fas fa-compress-alt"></i> compare
                </span>
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={() => compareHandler(unit, wishlisted)}
                >
                  <i className="fas fa-compress"></i> Comparing
                </span>
              )}
            </div>
          </div>
        </div>
        <div
          className="absolute flex justify-between text-sm"
          style={{ top: "10px", width: "100%" }}
        >
          <div
            className="bg-white rounded-md p-3 text-black-500"
            style={{ left: "15px", position: "absolute" }}
          >
            <i className="fas fa-calendar"></i> {unit.delivery_year}
          </div>
          <div
            className="bg-blue-900 rounded-md p-3 text-white"
            style={{ right: "15px", position: "absolute" }}
          >
            <i className="fas fa-home"></i> {unit.property_type.name[locale]}
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            singleUnitHandler(unit.id);
          }}
        >
          <div className="px-6 py-4 flex justify-between">
            <div>
              <h4 className="text-indigo-800">
                {locale === "ar" ? unit.sk_city.name_ar : unit.sk_city.name}
              </h4>
            </div>
            <div>
              <p className="text-gray-700 text-base">
                {t("compound")}: {unit.compound.name[locale]}
              </p>
            </div>
          </div>

          <div className="px-6 py-2 flex justify-between">
            <div className="px-6 pt-2 pb-2">
              <h3 style={{ color: "#000", fontWeight: 600 }}>
                {" "}
                {unit.fin_total} {t("dollar")}
              </h3>
              <h5
                className="text-gray-600"
                style={{ color: "#c4c4c4", fontWeight: 600 }}
              >
                {t("totalPrice")}
              </h5>
            </div>
            <div className="px-6 pt-2 pb-2">
              <h3 style={{ color: "#000", fontWeight: 600 }}>
                {unit.fin_years} {t("years")}
              </h3>
              <h5
                className="text-gray-600"
                style={{ color: "#c4c4c4", fontWeight: 600 }}
              >
                {t("totalYears")}
              </h5>
            </div>
          </div>
          <hr />
          <div className="px-6 py-4 flex justify-between">
            <div className="px-6 pt-2 pb-2">
              <h3 style={{ color: "#000", fontWeight: 600 }}>
                {" "}
                {unit.fin_down_payment} {t("dollar")}
              </h3>
              <h5
                className="text-gray-600"
                style={{ color: "#c4c4c4", fontWeight: 600 }}
              >
                {t("downPay")}
              </h5>
            </div>
            <div className="px-6 pt-2 pb-2">
              <h3 style={{ color: "#000", fontWeight: 600 }}>
                {unit.fin_monthly_payment} {t("dollar")}
              </h3>
              <h5
                className="text-gray-600"
                style={{ color: "#c4c4c4", fontWeight: 600 }}
              >
                {t("monthlyPay")}
              </h5>
            </div>
          </div>
          <hr />
          <div className="px-6 pt-2 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <i className="fas fa-bed"></i> {unit.bedrooms}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <i className="fas fa-toilet"></i> {unit.bathrooms}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Bua{/* to be replaced with icon  */}: {unit.bua}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
