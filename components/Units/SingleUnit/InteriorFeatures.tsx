import React from "react";
import useTranslation from "../../../hooks/useTranslation";

const InteriorFeatures = ({ unit }: { unit: any }) => {
  const { t } = useTranslation();

  return (
    <div className="border-gray-300 rounded-md shadow-md">
      <h3
        className="mb-3 py-4 w-100 px-5 rounded-md text-text-secondary flex justify-start items-center"
        style={{ backgroundColor: "#F5F6F7" }}
      >
        <img src="/images/interior.png" />
        <span className="text-lg font-medium mx-4 capitalize">
          {t("interiorFeat")}
        </span>
      </h3>
      <ul className="list-disc my-5 py-4 px-5 mx-3 flex flex-wrap justify-between items-center">
        <li className="my-2 text-text-secondary text-lg font-medium">
          {t("noRooms")}: 5
        </li>
        <li className="my-2 text-text-secondary text-lg font-medium">
          {t("typeRooms")}: 3 {t("bedrooms")}
          {t("comma")} 1 {t("kitchen")}
          {t("comma")} 2 {t("bathrooms")}
        </li>
      </ul>
    </div>
  );
};

export default InteriorFeatures;
