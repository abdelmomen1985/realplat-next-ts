import React, { useContext } from "react";
import { useRouter } from "next/router";
import useTranslation from "./../../../hooks/useTranslation";
import { AppContext } from "./../../../Context/AppContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Unit } from "../../../interfaces";

const FinderBreadCrumbs = ({ unit }: { unit: Unit }) => {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const { filterUnitsGlobal } = useContext(AppContext);
  const globalFilterByBreadCrumpHandler = (filterData: any) => {
    filterUnitsGlobal(filterData);
    router.push(`/${locale}/units`);
  };
  return (
    <div className="flex justify-start mx-2 md:mx-0 items-center mt-5 mb-4 capitalize">
      <button
        onClick={() =>
          globalFilterByBreadCrumpHandler({ compound_id: unit.compound?.id })
        }
        style={{
          color: "#9691A4",
        }}
      >
        {unit.compound.name[locale]}
      </button>
      <span className="mx-2">
        {locale === "en" ? (
          <FontAwesomeIcon icon={faChevronRight} />
        ) : (
          <FontAwesomeIcon icon={faChevronLeft} />
        )}
      </span>
      <button
        onClick={() =>
          globalFilterByBreadCrumpHandler({
            sk_district: unit.sk_district?._id,
          })
        }
        style={{
          color: "#9691A4",
        }}
      >
        {locale === "en" ? unit.sk_district?.name : unit.sk_district?.name_ar}
      </button>
      <span className="mx-2">
        {locale === "en" ? (
          <FontAwesomeIcon icon={faChevronRight} />
        ) : (
          <FontAwesomeIcon icon={faChevronLeft} />
        )}
      </span>
      <button
        onClick={() =>
          globalFilterByBreadCrumpHandler({ sk_city: unit.sk_city?._id })
        }
        style={{
          color: "var(--primary)",
        }}
      >
        {locale === "en" ? unit.sk_city?.name : unit.sk_city?.name_ar}
      </button>
    </div>
  );
};

export default FinderBreadCrumbs;
