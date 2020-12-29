import React, { useState } from "react";
import "rc-slider/assets/index.css";
import RangeSlider from "../Range/RangeSlider";

const pricesList = [
  {
    title: "Down Payment",
    key: "fin_down_payment",
    value: [0, 1150000],
    unit: "Egp",
  },
  {
    title: "Monthly Payment",
    key: "fin_monthly_payment",
    value: [0, 300000],
    unit: "Egp",
  },
  {
    title: "Total Price",
    key: "fin_total",
    value: [0, 8000000],
    unit: "Egp",
  },
  {
    title: "Payment Years",
    key: "fin_years",
    value: [0, 10],
    unit: "Years",
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
  const [pricesFilterState, setPricesFilterState] = useState<PricesFilterType>({
    fin_down_payment: pricesList[0].value,
    fin_monthly_payment: pricesList[1].value,
    fin_total: pricesList[2].value,
    fin_years: pricesList[3].value,
  });

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
      <div className="dd-wrapper relative">
        <button
          type="button"
          className="dd-header p-3 filter-button"
          onClick={toggleModal}
        >
          <div className="dd-header-title">
            <i className="fas fa-file-invoice-dollar"></i> Price Range{" "}
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
                  value={(pricesFilterState as any)[item.key]}
                  title={item.title}
                  unit={item.unit}
                  min={item.value[0]}
                  max={item.value[1]}
                  filtered={(value) => {
                    console.log(value);
                    setPricesFilterState(value);
                    let allFilters = { ...props.filterListState };
                    let newAllFilters = {
                      ...allFilters,
                      [item.key]: value[item.key],
                    };
                    props.filtered(newAllFilters);
                  }}
                  pricesFilterList={pricesFilterState}
                />
              );
            })}
            <button onClick={applyFiltersHandler}>Apply</button>
          </div>
        )}
      </div>
    </>
  );
}
