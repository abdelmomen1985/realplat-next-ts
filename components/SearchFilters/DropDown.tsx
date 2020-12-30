import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_LOCATIONS } from '../../query/locations';
import useTranslation from './../../hooks/useTranslation';

interface Ddprops {
  title: string;
  list: any;
  multiSelect: boolean;
  filtered: (val: any) => void;
  filterListState: any;
  icon: any;
  entryPoint: any;
}
export default function DropDown(props: Ddprops) {
  const { data } = useQuery(GET_LOCATIONS);
  const [isOpenState, setIsOpenState] = useState(false);
  const [listTitle, setListTitle] = useState(props.title);
  const list = props.list;
  const { t, locale } = useTranslation();
  const toggleList = () => {
    setIsOpenState(!isOpenState);
  };
  const selectItem = (item: any) => {
    let duplicateLocations = { ...props.filterListState };
    if (duplicateLocations.sk_city === item.sk_city._id) {
      delete duplicateLocations.sk_city;
      props.filtered(duplicateLocations);
      console.log(duplicateLocations);
    } else {
      setListTitle(locale === 'ar' ? item.sk_city.name_ar : item.sk_city.name);
      setIsOpenState(false);
      let filteredList = { ...props.filterListState };
      // setFilterList(...filterList, id)
      filteredList.sk_city = item.sk_city._id;
      props.filtered(filteredList);
      console.log(filteredList);
    }
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
            outline: none;
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
          onClick={toggleList}
        >
          <div className="dd-header-title">
            <i className={props.icon}></i> {listTitle}{' '}
            {isOpenState ? (
              <span>
                {' '}
                <i className="fas fa-angle-up"></i>
              </span>
            ) : (
              <span>
                <i className="fas fa-angle-down"></i>
              </span>
            )}
          </div>
        </button>
        {isOpenState && (
          <div
            role="list"
            className="dd-list absolute"
            style={{
              top: '0',
              background: '#fff',
              borderRadius: '5px',
              boxShadow: '0 2px 2px #eee',
              zIndex: '999',
              width: '100%',
            }}
          >
            {data?.units.map((item: any) => (
              <button
                type="button"
                className="dd-list-item"
                style={{
                  display: 'block',
                  margin: '5px auto',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
                key={item.sk_city._id}
                onClick={() => {
                  selectItem(item);
                }}
              >
                {locale === 'ar' ? item.sk_city.name_ar : item.sk_city.name}{' '}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
