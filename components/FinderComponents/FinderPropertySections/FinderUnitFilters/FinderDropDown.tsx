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
import { GET_LOCATIONS } from "../../../../query/locations";
import styles from "./filtersStyles.module.scss";

interface Ddprops {
  title: string;
  list: any;
  multiSelect: boolean;
  filtered: (val: any) => void;
  filterListState: any;
  icon: any;
  entryPoint: any;
}

export default function FinderDropDown(props: Ddprops) {
  const { data } = useQuery(GET_LOCATIONS);
  const [isOpenState, setIsOpenState] = useState(false);
  const [listTitle, setListTitle] = useState(props.title);
  const [locationsInnerState, setLocationsInnerState] = useState(data?.units);

  // const list = props.list;
  const { t, locale } = useTranslation();
  const node = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Init state
    if (data?.units) {
      const dummyData = [...data?.units];
      const falseChecked = dummyData.map((item: any) => {
        return { ...item, selected: false };
      });
      setLocationsInnerState(falseChecked);
    }
  }, [data?.units]);
  useEffect(() => {
    if (
      Object.keys(props.filterListState).length === 0 &&
      props.filterListState.constructor === Object
    ) {
      setListTitle("location");
      if (data?.units) {
        const dummyData = [...data?.units];
        const falseChecked = dummyData.map((item: any) => {
          return { ...item, selected: false };
        });
        setLocationsInnerState(falseChecked);
      }
    }
  }, [props.filterListState]);
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  useEffect(() => {
    if (data && locationsInnerState.length > 0) {
      locationsInnerState.map((single: any) => {
        if (single.sk_city._id === props.filterListState.sk_city) {
          console.log(single.sk_city.name);
          setListTitle(
            locale === "ar" ? single.sk_city.name_ar : single.sk_city.name
          );
        }
      });
    }
  }, [locationsInnerState]);
  const handleClick = (e: any) => {
    if (node?.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setIsOpenState(false);
  };
  const toggleList = () => {
    setIsOpenState(!isOpenState);
  };

  const selectItem = (item: any) => {
    item.selected = !item.selected;
    const newArray = locationsInnerState.map((single: any) => {
      if (single.sk_city._id === item.sk_city._id) return item;
      return { ...single, selected: false };
    });
    setLocationsInnerState(newArray);

    let duplicateLocations = { ...props.filterListState };
    if (duplicateLocations.sk_city === item.sk_city._id) {
      delete duplicateLocations.sk_city;
      props.filtered(duplicateLocations);
      console.log(duplicateLocations);
      setListTitle("location");
    } else {
      setListTitle(locale === "ar" ? item.sk_city.name_ar : item.sk_city.name);
      let filteredList = { ...props.filterListState };
      // setFilterList(...filterList, id)
      filteredList.sk_city = item.sk_city._id;
      props.filtered(filteredList);
      console.log(filteredList);
    }
    setIsOpenState(false);
  };

  return (
    <>
      <div
        className="dd-wrapper font-noto-sans w-11/12 mx-auto relative"
        ref={node}
      >
        <button
          type="button"
          className={clsx(styles.filterButton)}
          onClick={toggleList}
        >
          <div className="flex justify-between items-center">
            <div className="flex">
              {listTitle !== "location" && (
                <span className={clsx(styles.circularIcon)}></span>
              )}{" "}
              {t(`${listTitle}`)}{" "}
            </div>
            <div>
              {isOpenState ? (
                <span>
                  {" "}
                  <FontAwesomeIcon className="ml-1" icon={faAngleUp} />
                </span>
              ) : (
                <span>
                  <FontAwesomeIcon className="ml-1" icon={faAngleDown} />
                </span>
              )}
            </div>
          </div>
        </button>
        {isOpenState && (
          <div role="list" className={clsx(styles.ddList, "absolute")}>
            {locationsInnerState.map((item: any) => (
              <button
                type="button"
                style={{
                  display: "block",
                  margin: ".5em",
                  fontSize: "16px",
                }}
                key={item.sk_city._id}
                onClick={() => {
                  selectItem(item);
                }}
              >
                <span style={{ display: "inline-block", width: "1em" }}>
                  {item.selected ? (
                    <FontAwesomeIcon
                      style={{ color: "var(--primary)" }}
                      icon={faTimes}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={clsx(
                        styles.faCheckIcon,
                        "opacity-0 fnd-primary"
                      )}
                    />
                  )}
                </span>
                <span style={{ margin: ".5em" }}>
                  {locale === "ar" ? item.sk_city.name_ar : item.sk_city.name}{" "}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
