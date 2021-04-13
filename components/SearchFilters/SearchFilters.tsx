import React, { useEffect, useState } from 'react';
import DropDown from './DropDown';
import { Unit } from '../../interfaces/index';
import PricesModal from './PricesModal';
import MoreFiltersModal from './MoreFiltersModal';
import PropTypesDropDown from './PropTypesDropDown';
import { FilterListType } from '../../interfaces/filters';
import useTranslation from './../../hooks/useTranslation';
interface SearchFiltersProps {
  setFilterListState: (val: FilterListType) => void;
  filterListState: any;
  units: Unit[];
}

export default function SearchFilters(props: SearchFiltersProps) {
  const { t } = useTranslation();
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
      let duplicateLocations = locations.filter((location: any) => {
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
  }, []);

  return (
    <>
      <style jsx>
        {`
          .filter-button {
            color: #192a56;
            border: 1px solid #192a56;
            border-radius: 5px;
            font-weight: 500;
            outline: none;
          }
          .filter-button:hover {
            color: #ffffff;
            background-color: #192a56;
          }
        `}
      </style>
      <section className="">
        <div className="grid grid-cols-2 sm:grid-cols-3 mx-auto md:grid-cols-5 gap-1">
          {/* property Type */}

          <PropTypesDropDown
            title="prop_type"
            icon="fas fa-home"
            filtered={props.setFilterListState}
            filterListState={props.filterListState}
            entryPoint="property_types"
            isOpen={openPropTypeDD}
            toggOpen={(flag) => {
              setOpenPropTypeDD(flag);
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
          <MoreFiltersModal
            filtered={props.setFilterListState}
            filterListState={props.filterListState}
          />
          <div className="relative">
            <button
              className="p-3 filter-button"
              onClick={() => {
                props.setFilterListState({} as any);
                console.log(props.filterListState);
              }}
            >
              {t('clearFilters')}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
