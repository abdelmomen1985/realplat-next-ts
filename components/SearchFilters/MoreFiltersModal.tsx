import React, { useState } from 'react';
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
    values: [1, 2, 3, 4, 5],
  },
  {
    key: 'bathrooms',
    icon: 'fas fa-toilet',
    title: 'Bathrooms',
    values: [1, 2, 3, 4, 5],
  },
  {
    key: 'delivery_year',
    icon: 'fas fa-calendar',
    title: 'Delivery Date',
    values: ['Ready To Move', '2020', '2021', '2022', '2023'],
  },
  {
    key: 'finishing_type',
    icon: 'fas fa-paint-roller',
    title: 'Finishing Type',
    values: ['Fully Finished', 'Ready Finished '],
  },
];
export default function MoreFiltersModal({
  filtered,
  filterListState,
}: MoreFiltersProps) {
  const [innerFiltersState, setInnerFiltersState] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, locale } = useTranslation();
  const spaceChangeHandler = (value: number[]) => {
    console.log(value);
    let newState = { ...innerFiltersState };
    newState.space = value;
    setInnerFiltersState(newState);
  };
  const filterHandler = (value: any, key: string) => {
    let newState = { ...innerFiltersState };
    newState[key] = value;
    setInnerFiltersState(newState);
  };
  const applyFiltersHandler = () => {
    console.log(innerFiltersState);
    let allFilters = { ...filterListState };
    let newAllFilters = { ...allFilters, ...innerFiltersState };
    filtered(newAllFilters);
    console.log(newAllFilters);
    setIsModalOpen(false);
  };
  const clearAllHandler = () => {
    setInnerFiltersState({});
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
            width: 50vw;
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
        `}
      </style>
      <div className="relative">
        <button
          className="p-3 filter-button"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <div>
            <i className=""></i> More Filters{' '}
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
            <section className="modal">
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
                  Apply
                </button>
                <button
                  onClick={clearAllHandler}
                  className="mx-2 bg-white font-bold text-md text-gray-500 py-3 px-5 shadow-md"
                >
                  Clear All
                </button>
              </div>
              <div className="modal-body">
                <div className="flex flex-wrap">
                  <div className="flex-auto">
                    <h3>Space</h3>
                  </div>
                  <div className="flex-auto">
                    <span>
                      {innerFiltersState.space ? innerFiltersState.space[0] : 0}{' '}
                      M2
                    </span>
                    <Range
                      min={0}
                      max={500}
                      onChange={(value) => spaceChangeHandler(value)}
                      defaultValue={[0, 500]}
                    />
                    <span>
                      {innerFiltersState.space
                        ? innerFiltersState.space[1]
                        : 500}{' '}
                      M2
                    </span>
                  </div>
                </div>
                {innerList.map((item) => {
                  return (
                    <div className="flex flex-wrap my-2">
                      <div className="flex-auto" key={item.key}>
                        <h3>
                          <i className={item.icon}></i> {item.title}
                        </h3>
                      </div>
                      <div className="flex-auto">
                        {/* <div className="gird grid-cols-5 md:grid-cols-5 gap-1"> */}
                        {item.values.map((value, index) => {
                          return (
                            <button
                              key={index}
                              className="bg-white font-bold rounded-sm mx-2 px-3 py-1 shadow-md filterVal-button"
                              onClick={() => filterHandler(value, item.key)}
                            >
                              {value}
                            </button>
                          );
                        })}
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
