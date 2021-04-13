import React, { useState, useEffect } from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import useTranslation from './../../hooks/useTranslation';
interface MoreFiltersProps {
  filtered: (val: any) => void;
  filterListState: any;
}
const innerList = [
  {
    key: 'bedrooms',
    icon: 'fas fa-bed',
    title: 'Bedrooms',
    values: [
      {
        val: 1,
        selected: false,
      },
      {
        val: 2,
        selected: false,
      },
      {
        val: 3,
        selected: false,
      },
      {
        val: 4,
        selected: false,
      },
      {
        val: 5,
        selected: false,
      },
    ],
  },
  {
    key: 'bathrooms',
    icon: 'fas fa-toilet',
    title: 'Bathrooms',
    values: [
      {
        val: 1,
        selected: false,
      },
      {
        val: 2,
        selected: false,
      },
      {
        val: 3,
        selected: false,
      },
      {
        val: 4,
        selected: false,
      },
      {
        val: 5,
        selected: false,
      },
    ],
  },
  {
    key: 'delivery_year',
    icon: 'fas fa-calendar',
    title: 'Delivery Date',
    values: [
      {
        title: 'Ready_To_Move',
        val: 2019,
        selected: false,
      },
      {
        val: 2020,
        title: '2020',
        selected: false,
      },
      {
        val: 2021,
        title: '2021',
        selected: false,
      },
      {
        val: 2022,
        title: '2022',
        selected: false,
      },
      {
        val: 2023,
        title: '+2023',
        selected: false,
      },
    ],
  },
  {
    selected: false,
    key: 'finishing_type',
    icon: 'fas fa-paint-roller',
    title: 'Finishing Type',
    values: [
      {
        val: 'FF',
        selected: false,
      },
      {
        val: 'SF',
        selected: false,
      },
    ],
  },
];
export default function MoreFiltersModal({
  filtered,
  filterListState,
}: MoreFiltersProps) {
  const [innerFiltersState, setInnerFiltersState] = useState<any>({});
  const [innerListState, setInnerListState] = useState(innerList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, locale } = useTranslation();
  useEffect(() => {
    console.log('use Effect is running');
    if (
      Object.keys(filterListState).length === 0 &&
      filterListState.constructor === Object
    ) {
      console.log('use Effect condition is running');
      setInnerFiltersState({});
      setInnerListState(innerList);
    }
  }, [filterListState]);
  const spaceChangeHandler = (value: number[]) => {
    let newState = { ...innerFiltersState };
    newState.space = value;
    setInnerFiltersState(newState);
  };
  const filterHandler = (value: any, key: string) => {
    let selectedValue = { ...value };
    selectedValue.selected = true;
    let currentListState = [...innerListState];
    let newInnerList = currentListState.map((item) => {
      if (item.key === key) {
        let newValues = (item.values as any).map((value: any) => {
          if (value.val === selectedValue.val) return selectedValue;
          console.log('that value' + selectedValue.val);
          return { ...value, selected: false };
        });
        return { ...item, values: newValues };
      } else {
        return item;
      }
    });
    console.log(newInnerList);
    setInnerListState(newInnerList);
    let newState = { ...innerFiltersState };
    newState[key] = value.val;
    setInnerFiltersState(newState);
    console.log(newState);
  };
  const applyFiltersHandler = () => {
    let allFilters = { ...filterListState };
    let newAllFilters = { ...allFilters, ...innerFiltersState };
    filtered(newAllFilters);
    console.log(newAllFilters);
    setIsModalOpen(false);
  };
  const clearAllHandler = () => {
    setInnerFiltersState({});
    let allFilters = { ...filterListState };
    delete allFilters.bedrooms;
    delete allFilters.bathrooms;
    delete allFilters.delivery_year;
    delete allFilters.finishing_type;
    delete allFilters.space;

    let newAllFilters = { ...allFilters };
    filtered(newAllFilters);
    setIsModalOpen(false);
    setInnerListState(innerList);
  };
  return (
    <>
      <style jsx>
        {`
          .filter-button {
            color: #ffffff;
            background-color: #192a56;
            border-radius: 5px;
            font-weight: 500;
            outline: none;
          }
          .filter-button:hover {
            color: #192a56;
            border: 1px solid #192a56;
            background-color: #fff;
          }
          .overlay {
            position: fixed;
            display: block;
            overflow: auto;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
            cursor: pointer;
          }

          .modal {
            margin: 15% auto;
            background-color: white;
            border-radius: 0.25rem;
            padding: 2rem;
            position: relative;
          }
          .filterVal-button {
          }
          .filterVal-button:active,
          .filterVal-button:hover,
          .filterVal-button.active {
            background-color: #192a56;
            color: #fff;
          }
          .mSquare {
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline;
            top: -5px;
          }
        `}
      </style>
      <div className="relative">
        <button
          className="p-3 filter-button"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <div>
            <i className="fas fa-filter"></i> {t('moreFilters')}{' '}
            {isModalOpen ? (
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
        {isModalOpen && (
          <div className="overlay">
            <section className="modal w-full md:w-1/2">
              <div
                className="modal-header mb-5 border-b-2 pb-2"
                style={{ direction: locale === 'ar' ? 'ltr' : 'rtl' }}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mx-2 text-gray-500 font-bold text-md"
                >
                  <i className="fas fa-times"></i>
                </button>
                <button
                  onClick={applyFiltersHandler}
                  className="mx-2 bg-blue-900 font-bold text-md text-white py-3 px-5 shadow-md"
                >
                  {t('apply')}
                </button>
                <button
                  onClick={clearAllHandler}
                  className="mx-2 bg-white font-bold text-md text-gray-500 py-3 px-5 shadow-md"
                >
                  {t('clearAll')}
                </button>
              </div>
              <div className="modal-body">
                <div className="flex flex-wrap">
                  <div className="flex-auto">
                    <h3>{t('space')}</h3>
                  </div>
                  <div className="flex-auto">
                    <span>
                      {innerFiltersState.space ? innerFiltersState.space[0] : 0}{' '}
                      {t('meter')}
                      <span className="mSquare">2</span>
                    </span>
                    <Range
                      min={0}
                      max={500}
                      step={50}
                      onChange={(value) => spaceChangeHandler(value)}
                      defaultValue={
                        innerFiltersState.space
                          ? innerFiltersState.space
                          : [0, 500]
                      }
                    />
                    <span>
                      {innerFiltersState.space
                        ? innerFiltersState.space[1]
                        : 500}{' '}
                      {t('meter')}
                      <span className="mSquare">2</span>
                    </span>
                  </div>
                </div>
                {innerListState.map((item) => {
                  return (
                    <div className="flex flex-wrap my-2" key={item.key}>
                      <div className="flex-auto">
                        <h3>
                          <i className={item.icon}></i>{' '}
                          {t(`${item.key}`) ? t(`${item.key}`) : item.title}
                        </h3>
                      </div>
                      <div className="flex-auto">
                        {/* <div className="gird grid-cols-5 md:grid-cols-5 gap-1"> */}
                        {(item.values as any).map(
                          (value: any, index: number) => {
                            return (
                              <button
                                key={index}
                                className={
                                  'bg-white font-bold rounded-sm mx-2 my-2 px-3 py-1 shadow-md filterVal-button ' +
                                  (value.selected ? 'active' : null)
                                }
                                onClick={() => filterHandler(value, item.key)}
                              >
                                {value.title
                                  ? t(`${value.title}`)
                                    ? t(`${value.title}`)
                                    : value.title
                                  : t(`${value.val}`)
                                  ? t(`${value.val}`)
                                  : value.val}
                              </button>
                            );
                          }
                        )}
                      </div>
                      {/* </div> */}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
