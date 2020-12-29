import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { Unit } from "../../interfaces/index";
import PricesModal from "./PricesModal";
import PropTypesDropDown from "./PropTypesDropDown";
import { FilterListType } from "../../interfaces/filters";

interface SearchFiltersProps {
  setFilterListState: (val: FilterListType) => void;
  filterListState: any;
  units: Unit[];
}

export default function SearchFilters(props: SearchFiltersProps) {
  const [openPropTypeDD, setOpenPropTypeDD] = useState(false);
  const unitList: any = props.units;
  const prices: any = [];

  const locations: any = [];
  useEffect(() => {
    for (let unit in unitList) {
      prices.push({
        id: unitList[unit].id,
        totalPrice: unitList[unit].fin_total,
        downPayment: unitList[unit].fin_down_payment,
        monthlyPayment: unitList[unit].fin_monthly_payment,
        paymentYears: unitList[unit].fin_fin_years,
      });
      let duplicateLocations = locations.filter((location) => {
        return location.id === unitList[unit].sk_city._id;
      });
      if (duplicateLocations.length === 0) {
        locations.push({
          id: unitList[unit].sk_city._id,
          name: {
            ar: unitList[unit].sk_city.name_ar,
            en: unitList[unit].sk_city.name,
          },
        });
      }
    }
    console.log(locations, prices);
  }, []);

  return (
    <>
      <section className="">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          {/* property Type */}

          <PropTypesDropDown
            title="Property Type"
            icon="fas fa-home"
            filtered={props.setFilterListState}
            filterListState={props.filterListState}
            entryPoint="property_types"
            isOpen={openPropTypeDD}
            toggOpen={(flag) => {
              setOpenPropTypeDD(flag);
              console.log("toggOpen parent", flag);
            }}
          />
          {/* Location */}
          <DropDown
            title="Location"
            icon="fas fa-map-marked-alt"
            list={locations}
            multiSelect={false}
            filtered={props.setFilterListState}
            filterListState={props.filterListState}
            entryPoint="sk_city"
          />
          {/* prices */}
          {/* recreate another Component with Ranges */}
          <PricesModal
            filtered={props.setFilterListState}
            filterListState={props.filterListState}
          />
        </div>
      </section>
    </>
  );
}
