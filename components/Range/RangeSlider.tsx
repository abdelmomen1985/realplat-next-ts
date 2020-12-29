import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useState } from "react";
interface RangeProps {
  title: string;
  entry: string;
  filtered: (val: any) => void;
  pricesFilterList: any;
  value: number[];
  min: number;
  max: number;
  unit: string;
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
}: RangeProps) {
  const [payState, setPaymentState] = useState(value !== undefined);
  //const [valuesState, setValuesState] = useState(value);
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

  const priceChangeHadler = (value: number[]) => {
    //setValuesState(value);
    let filteredList = { ...pricesFilterList };
    filteredList[entry] = [...value];
    filtered(filteredList);
  };

  return (
    <div>
      <label htmlFor={entry}>{title}</label>
      <input
        type="checkbox"
        name={entry}
        checked={payState}
        onChange={() => changeHandler()}
      />
      <Range
        min={min}
        max={max}
        // tabIndex={[0, 0]}
        onChange={(value) => priceChangeHadler(value)}
        defaultValue={value ? value : [min, max]}
        disabled={!payState}
      />
      <h3>
        {value ? (
          <>
            {value?.[0] + "-" + value?.[1]} <span>{unit}</span>
          </>
        ) : (
          <div style={{ margin: "1.5em" }}></div>
        )}
      </h3>
    </div>
  );
}
