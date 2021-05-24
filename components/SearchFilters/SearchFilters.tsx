import React, { useEffect, useState } from 'react';
import DropDown from './DropDown';
import { Unit } from '../../interfaces/index';
import PricesModal from './PricesModal';
import MoreFiltersModal from './MoreFiltersModal';
import PropTypesDropDown from './PropTypesDropDown';
import { FilterListType } from '../../interfaces/filters';
import useTranslation from './../../hooks/useTranslation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
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
            color: #007882;
            border: 1px solid #007882;
            border-radius: 5px;
            font-weight: 500;
            outline: none;
          }
          .filter-button:hover {
            box-shadow: 0 0 6px 2px rgba(0, 120, 130, 0.4);
            border: transparent;
            color: #ffffff;
            background-color: #007882;
          }
        `}
      </style>
      <section className="">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-0 bg-gray-300 py-5 w-100">
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
              className="py-2 px-3 text-black border-none text-text-secondary text-lg font-medium hover:bg-gray-100 rounded-md hover:shadow-md"
              onClick={() => {
                props.setFilterListState({} as any);
                console.log(props.filterListState);
              }}
            >
              {t('clearFilters')}
              <FontAwesomeIcon icon={faTimes} style={{ width: 'auto !important' }}
                className="text-white bg-text-secondary px-1 py-1 mx-1 rounded-md shadow-md" />
            </button>
          </div>
          <div className="relative">
            <button
              className="py-2 px-3 text-black border-none text-text-secondary text-lg capitalize font-medium hover:bg-gray-100 rounded-md hover:shadow-md"
              onClick={() => {
                props.setFilterListState({} as any);
                console.log(props.filterListState);
              }}
            >
              {t('saveSearch')}
              <FontAwesomeIcon icon={faPlus} style={{ width: 'auto !important' }}
                className="text-white bg-text-secondary px-1 py-1 mx-1 rounded-md shadow-md" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
