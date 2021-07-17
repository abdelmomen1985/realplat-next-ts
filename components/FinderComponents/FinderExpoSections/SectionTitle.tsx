import React from 'react'
import clsx from "clsx"
import styles from "./finderExpo.module.scss";

export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex flex-col sm:flex-row m-2 md:m-0">
      <h1
        className={clsx(
          styles.notosansBoldMirage_28px,
          "font-semibold",
          "flex-grow"
        )}
      >
        {title}
      </h1>
      <div className={clsx("flex-grow")}></div>
      <div
        className={clsx(
          "flex",
          "items-center",
          styles.notosansNormalDolphin_14px
        )}
      >
        View All
        <img src="/images/finder/arrow.svg" alt="" />
      </div>
    </div>
  );
};