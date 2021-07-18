import clsx from "clsx";
import React, { useState } from "react";
import styles from "./finderExpo.module.scss";

export default function FinderHomeCatIcons() {
  const squareIconsDefault = {
    apartment: "/images/finder/apartment.svg",
    villa: "/images/finder/villa.svg",
    comercial: "/images/finder/shop.svg",
    studios: "/images/finder/rent.svg",
    townhouses: "/images/finder/house-chosen.svg",
  };
  const squareIconsHover = {
    apartment: "/images/finder/apartment-hover.svg",
    villa: "/images/finder/villa-hover.svg",
    comercial: "/images/finder/shop-hover.svg",
    studios: "/images/finder/rent-hover.svg",
    townhouses: "/images/finder/house-chosen-hover.svg",
  };
  const [squareIcons, setSquareIcons] = useState(squareIconsDefault);
  return (
    <div className={clsx(styles.categoriesXSScroll, "mt-8 flex")}>
      <div
        className={styles.categorysquare}
        onMouseOver={() => {
          setSquareIcons({
            ...squareIconsDefault,
            villa: squareIconsHover.villa,
          });
        }}
        onMouseOut={() => {
          setSquareIcons(squareIconsDefault);
        }}
      >
        <div className={styles.icon1}>
          <img className="apartment" src={squareIcons.villa} />
        </div>
        <div
          className={clsx(styles.notosansBoldMirage_16px, styles.categoryName)}
        >
          Villas
        </div>
      </div>
      <div
        className={styles.categorysquare}
        onMouseOver={() => {
          setSquareIcons({
            ...squareIconsDefault,
            apartment: squareIconsHover.apartment,
          });
        }}
        onMouseOut={() => {
          setSquareIcons(squareIconsDefault);
        }}
      >
        <div className={styles.icon1}>
          <img className="apartment" src={squareIcons.apartment} />
        </div>
        <div
          className={clsx(styles.notosansBoldMirage_16px, styles.categoryName)}
        >
          Apartments
        </div>
      </div>
      <div
        className={styles.categorysquare}
        onMouseOver={() => {
          setSquareIcons({
            ...squareIconsDefault,
            comercial: squareIconsHover.comercial,
          });
        }}
        onMouseOut={() => {
          setSquareIcons(squareIconsDefault);
        }}
      >
        <div className={styles.icon1}>
          <img className="apartment" src={squareIcons.comercial} />
        </div>
        <div
          className={clsx(styles.notosansBoldMirage_16px, styles.categoryName)}
        >
          Comercial
        </div>
      </div>
      <div
        className={styles.categorysquare}
        onMouseOver={() => {
          setSquareIcons({
            ...squareIconsDefault,
            studios: squareIconsHover.studios,
          });
        }}
        onMouseOut={() => {
          setSquareIcons(squareIconsDefault);
        }}
      >
        <div className={styles.icon1}>
          <img className="apartment" src={squareIcons.studios} />
        </div>
        <div
          className={clsx(styles.notosansBoldMirage_16px, styles.categoryName)}
        >
          Studios
        </div>
      </div>
      <div
        className={styles.categorysquare}
        onMouseOver={() => {
          setSquareIcons({
            ...squareIconsDefault,
            townhouses: squareIconsHover.townhouses,
          });
        }}
        onMouseOut={() => {
          setSquareIcons(squareIconsDefault);
        }}
      >
        <div className={styles.icon1}>
          <img className="apartment" src={squareIcons.townhouses} />
        </div>
        <div
          className={clsx(styles.notosansBoldMirage_16px, styles.categoryName)}
        >
          Townhouses
        </div>
      </div>
    </div>
  );
}
