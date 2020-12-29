import React, { useState } from 'react';
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
  const [isOpenState, setIsOpenState] = useState(false);
  const [listTitle, setListTitle] = useState(props.title);
  const list = props.list;
  const [filterList, setFilterList] = useState<any[]>([]);
  const { t, locale } = useTranslation();
  const toggleList = () => {
    setIsOpenState(!isOpenState);
  };
  const selectItem = (item: any) => {
    setListTitle(locale === 'ar' ? item.name.ar : item.name.en);
    console.log('single');
    setIsOpenState(false);
    let filteredList = { ...props.filterListState };
    let key = props.entryPoint;
    filteredList[key] = [...filterList];
    props.filtered(filterList);
    console.log(filteredList);
  };
  const toggleItem = (item: any) => {
    console.log('multi');
    setFilterList([...filterList, item]);
    if (filterList.length === 2) {
      setListTitle(`${filterList[0]} + ${filterList[1]}`);
    } else if (filterList.length > 2) {
      setListTitle(`${filterList[0]} + ${filterList.length - 1}`);
    } else {
      // late step of the Dom
      setListTitle(filterList[0]);
    }
    let filteredList = { ...props.filterListState };
    let key = props.entryPoint;
    filteredList[key] = [...filterList];
    props.filtered(filteredList);
    console.log(props.filterListState);
    console.log(filteredList);
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
            {list.map((item: any) => (
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
                key={item.id}
                onClick={() =>
                  props.multiSelect ? toggleItem(item) : selectItem(item)
                }
              >
                {locale === 'ar' ? item.name.ar : item.name.en}{' '}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
