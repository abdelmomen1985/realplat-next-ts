import { useQuery } from "@apollo/client";
import {
  faAngleDown,
  faAngleUp,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import useTranslation from "../../../../hooks/useTranslation";
import { FilterListType, PropertyType } from "../../../../interfaces/filters";
import { GET_PROPERTY_TYPES } from "../../../../query/propertyTypes";
import styles from "./filtersStyles.module.scss";

interface PropTypesDropDownProps {
  title: string;
  filtered: (val: FilterListType) => void;
  filterListState: any;
  icon: any;
  entryPoint: any;
  isOpen: boolean;
  toggOpen: (flag: boolean) => void;
}

export default function FinderPropTypesDropDown({
  title,
  filtered,
  filterListState,
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
      <div className="font-noto-sans w-11/12  mx-auto relative" ref={node}>
        <button
          type="button"
          className={clsx(styles.filterButton)}
          onClick={() => {
            toggOpen(!isOpen);
          }}
        >
          <div className="flex justify-between items-center">
            {listTitle !== "prop_type" && (
              <span className={clsx(styles.circularIcon)}></span>
            )}
            {t(`${listTitle.toLowerCase()}`)}{" "}
            {isOpen ? (
              <span>
                {" "}
                <FontAwesomeIcon icon={faAngleUp} className="ml-1" />
              </span>
            ) : (
              <span>
                <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
              </span>
            )}
          </div>
        </button>
        {isOpen && (
          <div role="list" className={clsx(styles.ddList, "absolute")}>
            {propTypesInnerState &&
              propTypesInnerState.map((item: PropertyType) => (
                <button
                  type="button"
                  style={{
                    display: "block",
                    margin: ".5em",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                  key={item.id}
                  onClick={() => multiSelectItem(item)}
                >
                  <span style={{ display: "inline-block", width: "1em" }}>
                    {item.selected ? (
                      <FontAwesomeIcon
                        style={{ width: "1em" }}
                        icon={faTimes}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={clsx(styles.faCheckIcon, "opacity-0")}
                      />
                    )}
                  </span>
                  <span style={{ margin: ".5em" }}>
                    {locale === "ar" ? item.name.ar : item.name.en}{" "}
                  </span>
                </button>
              ))}
            <button
              type="button"
              style={{
                display: "block",
                margin: ".5em 1.5em",
                color: "red",
                fontSize: "16px",
                fontWeight: 500,
              }}
              onClick={() => {}}
            >
              <span style={{ margin: ".5em" }}>{" Clear All"}</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
