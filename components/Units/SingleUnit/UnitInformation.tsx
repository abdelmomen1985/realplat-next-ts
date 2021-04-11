import React from "react";
import useTranslation from "../../../hooks/useTranslation";

export default function UnitInformation({ unit }: { unit: any }) {
  const { t, locale } = useTranslation();

  return (
    <div className="px-5 py-3">
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
      <h3
        style={{
          width: "100%",
          textAlign: locale === "en" ? "left" : "right",
          background: "rgba(149,165,166, 0.5)",
          color: "rgb(44,62,80)",
          fontSize: "20px",
          fontWeight: "bold",
          padding: "15px 10px",
          margin: "15px 3px",
        }}
      >
        {t("unitInfo")}
      </h3>
      <div className="flex flex-wrap justify-between py-3 px-2">
        <div>
          <h5 className="capitalize">
            <span className="text-indigo-800 font-bold">
              <i className="fas fa-home"></i> {t("unitType")}
            </span>
            : {unit.property_type.name[locale]}
          </h5>
        </div>
      </div>
      <div className="flex flex-wrap justify-between py-3 px-2">
        <div>
          <h5 className="capitalize">
            <span className="text-indigo-800 font-bold">
              <i className="fas fa-home"></i> {t("landArea")}
            </span>
            : {unit.land} {t("meter")}
            <span className="mSquare">2</span>
          </h5>
        </div>
        <div>
          <h5 className="capitalize">
            <span className="text-indigo-800 font-bold">
              <i className="fas fa-home"></i> {t("bua")}
            </span>
            : {unit.bua} {t("meter")}
            <span className="mSquare">2</span>
          </h5>
        </div>
      </div>
      <div className="flex flex-wrap justify-between py-3 px-2">
        <div>
          <h5 className="capitalize">
            <span className="text-indigo-800 font-bold">
              <i className="fas fa-home"></i> {t("bedrooms")}
            </span>
            : {unit.bedrooms}
          </h5>
        </div>
        <div>
          <h5 className="capitalize">
            <span className="text-indigo-800 font-bold">
              <i className="fas fa-home"></i> {t("bathrooms")}
            </span>
            : {unit.bathrooms}
          </h5>
        </div>
      </div>
    </div>
  );
}
