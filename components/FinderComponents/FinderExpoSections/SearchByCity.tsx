import React from "react";
import styles from "./finderExpo.module.scss";
import clsx from "clsx";

const CityCard = () => {
  return (
    <div className={clsx(styles.cityCard, "m-4 md:m-1")}>
      <img src="/images/finder/cities/new-cairo.png" alt="" />
      <h1 className={clsx(styles.notosansBoldDolphin_16px, "my-3 text-center")}>
        New Cairo
      </h1>
    </div>
  );
};

export default function SearchByCity() {
  return (
    <>
      {/* Search By City Cards */}
      <div className={clsx("mt-8 md:flex")}>
        <CityCard />
        <CityCard />
        <CityCard />
        <CityCard />
        <CityCard />
      </div>
    </>
  );
}
