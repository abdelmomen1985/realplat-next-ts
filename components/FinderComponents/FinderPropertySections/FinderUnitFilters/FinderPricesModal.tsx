import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import "rc-slider/assets/index.css";
import React, { useEffect, useRef, useState } from "react";
import useTranslation from "../../../../hooks/useTranslation";
import RangeSlider from "../../../Range/RangeSlider";
import styles from "./filtersStyles.module.scss";
const pricesList = [
  {
    title: "downPay",
    key: "fin_down_payment",
    value: [0, 2000000],
    unit: "Egp",
    step: 100000,
  },
  {
    title: "monthlyPay",
    key: "fin_monthly_payment",
    value: [0, 300000],
    unit: "Egp",
    step: 5000,
  },
  {
    title: "totalPrice",
    key: "fin_total",
    value: [0, 25000000],
    unit: "Egp",
    step: 100000,
  },
  {
    title: "paymentYears",
    key: "fin_years",
    value: [0, 15],
    unit: "Years",
    step: 1,
  },
];

type PricesFilterType = {
  fin_down_payment: number[];
  fin_monthly_payment: number[];
  fin_total: number[];
  fin_years: number[];
};

export default function FinderPricesModal(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const node = useRef<HTMLDivElement>(null);
  const [pricesFilterState, setPricesFilterState] = useState<PricesFilterType>({
    fin_down_payment: pricesList[0].value,
    fin_monthly_payment: pricesList[1].value,
    fin_total: pricesList[2].value,
    fin_years: pricesList[3].value,
  });
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleClick = (e: any) => {
    if (node?.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setIsModalOpen(false);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const applyFiltersHandler = () => {
    let allFilters = { ...props.filterListState };
    let newAllFilters = { ...allFilters, ...pricesFilterState };
    props.filtered(newAllFilters);
    console.log(newAllFilters);
    setIsModalOpen(false);
  };
  return (
    <>
      <div
        className="dd-wrapper font-noto-sans w-11/12 mx-auto relative "
        ref={node}
      >
        <button
          type="button"
          className={clsx(styles.filterButton)}
          onClick={toggleModal}
        >
          <div className="flex justify-between items-center">
            {/* <FontAwesomeIcon icon={faFileInvoiceDollar} /> */}{" "}
            {t("priceRange")}{" "}
            {isModalOpen ? (
              <span>
                {" "}
                <FontAwesomeIcon className="ml-1" icon={faAngleUp} />
              </span>
            ) : (
              <span>
                <FontAwesomeIcon className="ml-1" icon={faAngleDown} />
              </span>
            )}
          </div>
        </button>
        {isModalOpen && (
          <div className={clsx(styles.ddList, "absolute")}>
            {pricesList.map((item) => {
              return (
                <RangeSlider
                  key={item.key}
                  entry={item.key}
                  value={
                    (pricesFilterState as any)[item.key]
                      ? (pricesFilterState as any)[item.key]
                      : item.value
                  }
                  title={item.title}
                  unit={item.unit}
                  min={item.value[0]}
                  max={item.value[1]}
                  step={item.step}
                  filterListState={props.filterListState}
                  filtered={(value) => {
                    setPricesFilterState(value);
                  }}
                  pricesFilterList={pricesFilterState}
                />
              );
            })}
            <div className="w-full text-center">
              <button
                onClick={applyFiltersHandler}
                className="w-10/12 rounded-md bg-red text-white font-bold text-base p-2 mt-2 mb-1 mx-auto"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
