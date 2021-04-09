import React from "react";
import useTranslation from "../../../hooks/useTranslation";
export default function FloorPlan({ unit }: { unit: any }) {
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
        {t("floorPlan")}
      </h3>
      <img src={unit.media.floor_plan} className="w-full" />
    </div>
  );
}
