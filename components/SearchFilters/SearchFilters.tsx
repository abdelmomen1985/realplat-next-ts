import React, { useEffect } from 'react';
import DropDown from './DropDown';
import { Unit } from '../../interfaces/index';
import PricesModal from './PricesModal';
interface SearchFiltersProps {
  setFilterListState: (val: any) => void;
  filterListState: any;
  units: Unit[];
}
export default function SearchFilters(props: SearchFiltersProps) {
  const unitList: any = props.units;
  const prices: any = [];
  const propertyTypes: any = [];
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
      let duplicateProperty = propertyTypes.filter((type) => {
        return type.id === unitList[unit].property_type.id;
      });
      if (duplicateProperty.length === 0) {
        propertyTypes.push({
          id: unitList[unit].property_type.id,
          name: {
            ar: unitList[unit].property_type.name.ar,
            en: unitList[unit].property_type.name.en,
          },
        });
      }
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
    console.log(locations, prices, propertyTypes);
  }, []);
  return (
    <>
      <section className="">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          {/* property Type */}
          <DropDown
            title="Property Type"
            icon="fas fa-home"
            list={propertyTypes}
            multiSelect={true}
            filtered={props.setFilterListState}
            filterListState={props.filterListState}
            entryPoint="property_type"
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
