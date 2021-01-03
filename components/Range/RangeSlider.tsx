import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { useState, useEffect } from 'react';
import useTranslation from './../../hooks/useTranslation';
interface RangeProps {
  title: string;
  entry: string;
  filtered: (val: any) => void;
  pricesFilterList: any;
  filterListState: any;
  value: number[];
  min: number;
  max: number;
  unit: string;
  step: number;
}

export default function RangeSlider({
  title,
  entry,
  filtered,
  pricesFilterList,
  value,
  min,
  max,
  unit,
  step,
  filterListState,
}: RangeProps) {
  const [payState, setPaymentState] = useState(value !== undefined);
  const { t, locale } = useTranslation();
  //const [valuesState, setValuesState] = useState(value);
  useEffect(() => {
    console.log('use Effect is running');
    if (
      Object.keys(filterListState).length === 0 &&
      filterListState.constructor === Object
    ) {
      console.log('use Effect condition is running');
      setPaymentState(true);
      let filteredList = { ...pricesFilterList };
      delete filteredList[entry];
      filtered(filteredList);
    }
  }, [filterListState]);
  const changeHandler = () => {
    setPaymentState(!payState);
    if (payState === true) {
      let filteredList = { ...pricesFilterList };
      delete filteredList[entry];
      filtered(filteredList);
    } else {
      let newValue = { [entry]: [min, max] } as any;
      let filteredList = { ...pricesFilterList, ...newValue };
      filtered(filteredList);
    }
  };

  const priceChangeHandler = (value: number[]) => {
    //setValuesState(value);
    let filteredList = { ...pricesFilterList };
    filteredList[entry] = [...value];
    filtered(filteredList);
  };

  return (
    <div className="p-2 m-3">
      <input
        type="checkbox"
        name={entry}
        checked={payState}
        onChange={() => changeHandler()}
      />
      <label htmlFor={entry} className="ml-2">
        {t(`${title}`)}
      </label>
      <Range
        min={min}
        max={max}
        step={step}
        // tabIndex={[0, 0]}
        onChange={(value) => priceChangeHandler(value)}
        defaultValue={value ? value : [min, max]}
        disabled={!payState}
      />
      <h3>
        {value ? (
          <div className="flex flex-wrap justify-between">
            <div>{value?.[0]}</div> -{' '}
            <div>
              {value?.[1]} <span>{t(`${unit.toLowerCase()}`)}</span>
            </div>{' '}
          </div>
        ) : (
          <div style={{ margin: '1.5em' }}></div>
        )}
      </h3>
    </div>
  );
}
