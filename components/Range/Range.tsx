import React, { useState } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
interface RangeProps {
  title: string;
  entry: string;
  filtered: (val: any) => void;
  pricesFilterList: any;
  value: any;
  unit: string;
}
export default function RangeSlider(props: RangeProps) {
  const [payState, setPaymentState] = useState(true);
  const [valuesState, setValuesState] = useState(props.value);
  const changeHandler = (entry) => {
    setPaymentState(!payState);
  };
  const priceChangeHadler = (value, entry) => {
    setValuesState(value);
    let filteredList = { ...props.pricesFilterList };
    let key = props.entry;
    filteredList[key] = [...valuesState];
    props.filtered(filteredList);
  };
  return (
    <div>
      <label htmlFor={props.entry}>{props.title}</label>
      <input
        type="checkbox"
        name={props.entry}
        checked={payState}
        onChange={() => changeHandler(props.entry)}
      />
      <Range
        min={props.value[0]}
        max={props.value[1]}
        // tabIndex={[0, 0]}
        onChange={(value) => priceChangeHadler(value, props.entry)}
        defaultValue={props.value}
        disabled={!payState}
      />
      <h3>
        {valuesState[0] + '-' + valuesState[1]}
        <span>{props.unit}</span>
      </h3>
    </div>
  );
}
