import { useQuery } from "@apollo/client";
import React, { useState, useEffect, useRef } from "react";
import { GET_LOCATIONS } from "../../query/locations";
import useTranslation from "./../../hooks/useTranslation";

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
          console.log(single.sk_city.name)
          setListTitle(locale === "ar" ? single.sk_city.name_ar : single.sk_city.name)
        }
      })
    }
  }, [locationsInnerState])
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
      <style jsx>
        {`
      
          .filter-button:hover {
            box-shadow: 0 0 6px 2px rgba(0, 120, 130, 0.4);
            border: transparent;
            color: #ffffff;
            background-color: #007882;
          }
          .circularIcon{
            width: 10px;
            height: 10px;
            margin-right: 5px;
            background-color: #EDAE49;
            border-radius: 50%;
            border: transparent;
            display: block
          }
        `}
      </style>
      <div className="dd-wrapper mx-auto relative" ref={node}>
        <button
          type="button"
          className="dd-header border py-3 px-3 border-gray-400 bg-white rounded-md font-medium filter-button"
          onClick={toggleList}
        >
          <div className="dd-header-title flex justify-between items-center">
            {listTitle !== 'location' && <span className="circularIcon"></span>} {t(`${listTitle.toLowerCase()}`)}{" "}
            {isOpenState ? (
              <span>
                {" "}
                <i className="fas fa-angle-up ml-1"></i>
              </span>
            ) : (
              <span>
                <i className="fas fa-angle-down ml-1"></i>
              </span>
            )}
          </div>
        </button>
        {isOpenState && (
          <div
            role="list"
            className="dd-list absolute"
            style={{
              top: "0",
              background: "#fff",
              borderRadius: "5px",
              boxShadow: "0 2px 2px #eee",
              zIndex: 999,
              width: "100%",
            }}
          >
            {locationsInnerState.map((item: any) => (
              <button
                type="button"
                className="dd-list-item"
                style={{
                  display: "block",
                  margin: "5px auto",
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
                key={item.sk_city._id}
                onClick={() => {
                  selectItem(item);
                }}
              >
                {locale === "ar" ? item.sk_city.name_ar : item.sk_city.name}{" "}
                {item.selected ? <i className="fas fa-times"></i> : null}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
