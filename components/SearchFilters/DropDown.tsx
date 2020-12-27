import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';

interface Ddprops {
  title: string;
  list: any;
}
export default function DropDown(props: Ddprops) {
  const [isOpenState, setIsOpenState] = useState(false);
  const [listTitle, setListTitle] = useState(props.title);
  const list = props.list;
  const toggleList = () => {
    setIsOpenState(!isOpenState);
  };
  const selectItem = (item: any) => {
    setListTitle(item.value);
  };

  return (
    <div className="dd-wrapper">
      <button type="button" className="dd-header" onClick={toggleList}>
        <div className="dd-header-title">{listTitle}</div>
        {isOpenState ? (
          <FontAwesome name="angle-up" size="2x" />
        ) : (
          <FontAwesome name="angle-down" size="2x" />
        )}
      </button>
      {isOpenState && (
        <div role="list" className="dd-list">
          {list.map((item: any) => (
            <button
              type="button"
              className="dd-list-item"
              key={item.key}
              onClick={() => selectItem(item)}
            >
              {item.label} {item.value && <FontAwesome name="check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
