import clsx from "clsx";
import React from "react";
import styles from "./finderExpo.module.scss";

type CityType = {
  title: string;
  img: string;
  mellwOffers: number;
  propRequests: number;
};
const cities: CityType[] = [
  {
    title: "New Cairo",
    img: "/images/cities/new-cairo.jpg",
    mellwOffers: 290,
    propRequests: 1700,
  },
  {
    title: "El Gouna",
    img: "/images/cities/algona.jpg",
    mellwOffers: 170,
    propRequests: 900,
  },
  {
    title: "New Capital",
    img: "/images/cities/new-capital.jpg",
    mellwOffers: 370,
    propRequests: 1900,
  },
  {
    title: "North Coast",
    img: "/images/cities/marasi.jpg",
    mellwOffers: 210,
    propRequests: 800,
  },
  /*
  {
    title: "Ein Sokhna ",
    img: "/images/finder/cities/new-cairo.png",
    mellwOffers: 110,
    propRequests: 300,
  },
  */
];

const ProgressBarIndicator = ({
  num,
  denom,
}: {
  num: number;
  denom: number;
}) => {
  const percentage = ((num / denom) * 100).toFixed(0);
  return (
    <div className="flex">
      <div className="w-9/12">
        <div className="relative pt-1">
          <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-pink-200">
            <div
              style={{ width: `${percentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
            ></div>
          </div>
        </div>
      </div>
      <div className="w-3/12 text-sm font-semibold pt-1 px-2">{num}</div>
    </div>
  );
};
const CityCard = ({ city }: { city: CityType }) => {
  return (
    <div className={clsx(styles.cityCard, "m-4 md:m-1 ")}>
      <div className="relative">
        <img
          src={city.img}
          alt=""
          className="object-cover object-center"
          style={{ width: "100%", height: "180px" }}
        />
        <div
          className={clsx(styles.cardOver, "hidden inset-0 absolute w-full")}
        >
          <div className={clsx("text-white mx-4 w-full text-sm")}>
            <div>
              <img
                src="/images/finder/credit-card.svg"
                width="16"
                height="16"
                alt=""
                className="inline-block "
              />
              <span className="inline-block mx-2 pt-1">Mellw Offers</span>
              <ProgressBarIndicator num={city.mellwOffers} denom={500} />
            </div>
            <div className="mt-1">
              <img
                src="/images/finder/home.svg"
                width="16"
                height="16"
                alt=""
                className="inline-block"
              />
              <span className="inline-block mx-2 pt-1">
                Properties Requests{" "}
              </span>
              <ProgressBarIndicator num={city.propRequests} denom={2000} />
            </div>
          </div>
        </div>
      </div>

      <h1 className={clsx(styles.notosansBoldDolphin_16px, "my-3 text-center")}>
        {city.title}
      </h1>
    </div>
  );
};

export default function SearchByCity() {
  return (
    <>
      {/* Search By City Cards */}
      <div className={clsx("mt-8 md:flex")}>
        {cities.map((city: CityType, index: number) => (
          <CityCard city={city} key={index} />
        ))}
      </div>
    </>
  );
}
