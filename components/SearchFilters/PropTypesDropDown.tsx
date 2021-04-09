import { useQuery } from "@apollo/client";
import React, { useState, useEffect, useRef } from "react";
import { FilterListType, PropertyType } from "../../interfaces/filters";
import { GET_PROPERTY_TYPES } from "../../query/propertyTypes";
import useTranslation from "./../../hooks/useTranslation";

interface PropTypesDropDownProps {
  title: string;
  filtered: (val: FilterListType) => void;
  filterListState: any;
  icon: any;
  entryPoint: any;
  isOpen: boolean;
  toggOpen: (flag: boolean) => void;
}

export default function PropTypesDropDown({
  title,
  filtered,
  filterListState,
  icon,
  entryPoint,
  isOpen,
  toggOpen,
}: PropTypesDropDownProps) {
  const { data } = useQuery(GET_PROPERTY_TYPES);
  const [listTitle, setListTitle] = useState<string>(title);
  //const [setInnerFilterList] = useState<any[]>([]);
  const { t, locale } = useTranslation();
  const [propTypesInnerState, setPropTypesInnerState] = useState<any[]>(
    data?.property_types
  );
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Init state
    if (data?.property_types) {
      const dummyData = [...data?.property_types];
      const falseChecked = dummyData.map((item: any) => {
        return { ...item, selected: false };
      });
      setPropTypesInnerState(falseChecked);
    }
  }, [data?.property_types]);

  useEffect(() => {
    console.log("use Effect is running");
    if (
      Object.keys(filterListState).length === 0 &&
      filterListState.constructor === Object
    ) {
      console.log("use Effect condition is running");
      setListTitle("prop_type");
      if (data?.property_types) {
        const dummyData = [...data?.property_types];
        const falseChecked = dummyData.map((item: any) => {
          return { ...item, selected: false };
        });
        setPropTypesInnerState(falseChecked);
        //setInnerFilterList([]);
        toggOpen(false);
      }
    }
  }, [filterListState]);
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleClick = (e: any) => {
    if (node?.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    toggOpen(false);
  };

  const multiSelectItem = (item: PropertyType) => {
    // Toggle selected
    item.selected = !item.selected;

    const newArray = propTypesInnerState.map((single: PropertyType) => {
      if (single.id === item.id) return item;
      return single;
    });
    const onlySelectedArray = newArray.filter(
      (item: PropertyType) => item.selected === true
    );
    console.log(onlySelectedArray);
    setPropTypesInnerState(newArray);
    let filteredList = { ...filterListState };
    const selectedIds = onlySelectedArray.map(
      (single: PropertyType) => single.id
    );
    filteredList[entryPoint] = selectedIds.length > 0 ? selectedIds : null;
    filtered(filteredList);

    // label change
    if (onlySelectedArray.length === 1) {
      setListTitle(`${onlySelectedArray[0].name[locale]}`);
    } else if (onlySelectedArray.length === 2) {
      setListTitle(
        `${onlySelectedArray[0].name[locale]} + ${onlySelectedArray[1].name[locale]}`
      );
    } else if (onlySelectedArray.length > 2) {
      setListTitle(
        `${onlySelectedArray[0].name[locale]} + ${onlySelectedArray.length - 1}`
      );
    } else if (onlySelectedArray.length === 0) {
      setListTitle("prop_type");
    } else {
      setListTitle(`${onlySelectedArray[0].name[locale]}`);
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
          }
          .filter-button:hover {
            color: #ffffff;
            background-color: #192a56;
          }
        `}
      </style>
      <div className="dd-wrapper relative" ref={node}>
        <button
          type="button"
          className="dd-header p-3 filter-button"
          onClick={() => {
            toggOpen(!isOpen);
          }}
        >
          <div className="dd-header-title">
            <i className={icon}></i> {t(`${listTitle.toLowerCase()}`)}{" "}
            {isOpen ? (
              <span>
                {" "}
                <i className="fas fa-angle-up"></i>
              </span>
            ) : (
              <span>
                <i className="fas fa-angle-down"></i>
              </span>
            )}
          </div>
        </button>
        {isOpen && (
          <div
            role="list"
            className="dd-list absolute"
            style={{
              top: "0",
              background: "#fff",
              borderRadius: "5px",
              boxShadow: "0 2px 2px #eee",
              width: "100%",
              zIndex: 900,
            }}
          >
            {propTypesInnerState &&
              propTypesInnerState.map((item: PropertyType) => (
                <button
                  type="button"
                  className="dd-list-item"
                  style={{
                    display: "block",
                    margin: "5px auto",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "bolder",
                  }}
                  key={item.id}
                  onClick={() => multiSelectItem(item)}
                >
                  {locale === "ar" ? item.name.ar : item.name.en}{" "}
                  {item.selected ? <i className="fas fa-check"></i> : ""}
                </button>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
