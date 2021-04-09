import React, { useState, useEffect, useRef } from "react";
import "rc-slider/assets/index.css";
import RangeSlider from "../Range/RangeSlider";
import useTranslation from "./../../hooks/useTranslation";

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
    step: 100000,
  },
  {
    title: "totalPrice",
    key: "fin_total",
    value: [0, 8000000],
    unit: "Egp",
    step: 100000,
  },
  {
    title: "paymentYears",
    key: "fin_years",
    value: [0, 10],
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

export default function PricesModal(props: any) {
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
      <style jsx>
        {`
          .filter-button {
            color: #192a56;
            border: 1px solid #192a56;
            border-radius: 5px;
            font-weight: 500;
          }
          .filter-button:hover {
            color: #ffffff;
            background-color: #192a56;
          }
        `}
      </style>
      <div className="dd-wrapper relative" ref={node}>
        <button
          type="button"
          className="dd-header p-3 filter-button"
          onClick={toggleModal}
        >
          <div className="dd-header-title">
            <i className="fas fa-file-invoice-dollar"></i> {t("priceRange")}{" "}
            {isModalOpen ? (
              <span>
                {" "}
                <i className="fas fa-angle-up"></i>
              </span>
            ) : (
              <span>
                <i className="fas fa-angle-down"></i>
              </span>
            )}
          </div>
        </button>
        {isModalOpen && (
          <div
            className="dd-list absolute"
            style={{
              top: "0",
              background: "#fff",
              borderRadius: "5px",
              boxShadow: "0 2px 2px #eee",
              zIndex: 999,
              width: "100%",
            }}
          >
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
            <button
              onClick={applyFiltersHandler}
              className="w-full rounded-md bg-blue-900 text-white font-bold text-md p-3 mt-2 mb-1 mx-auto"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </>
  );
}
