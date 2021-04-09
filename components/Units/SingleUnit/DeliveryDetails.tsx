import React from "react";
import useTranslation from "../../../hooks/useTranslation";

export default function DeliveryDetails({ unit }: { unit: any }) {
  const { t, locale } = useTranslation();

  return (
    <div className="px-5 py-3">
      <h3
        style={{
          width: "100%",
          textAlign: locale === "en" ? "left" : "right",
          background: "rgba(149,165,166, 0.5)",
          color: "rgb(44,62,80)",
          fontSize: "20px",
          fontWeight: "bold",
          padding: "5px 10px",
          margin: "15px 3px",
        }}
      >
        {t("deliveryDetails")}
      </h3>
      <div className="flex flex-wrap justify-around">
        <div className="bg-indigo-800 rounded-md text-white text-lg text-center px-3 py-1 my-3 font-bold">
          <i className="fas fa-home"></i> {unit.finishing_type}
        </div>
        <div className="border border-indigo-800 rounded-md text-lg text-center text-indigo-800 px-3 py-1 my-3 font-bold">
          <i className="fas fa-calendar"></i> {t("deliveredIn")}{" "}
          {unit.delivery_year}
        </div>
      </div>
    </div>
  );
}
