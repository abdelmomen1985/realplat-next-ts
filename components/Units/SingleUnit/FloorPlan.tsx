import React from "react";
import useTranslation from "../../../hooks/useTranslation";
import styles from './unit.module.scss'
import clsx from 'clsx'
export default function FloorPlan({ unit }: { unit: any }) {
  const { t, locale } = useTranslation();

  return (
    <div className="my-3 border-gray-300 rounded-md shadow-md">
      <h3 className="mb-3 py-4 rounded-md w-100 px-5 text-text-secondary flex justify-start items-center"
        style={{ backgroundColor: '#F5F6F7' }}
      >
        <img src="/images/location.png" />
        <span className="text-2xl font-medium mx-4 capitalize">{t("floorPlan")}</span>
      </h3>

      <div className={styles.floorPlanContainer}>
        <img src={unit.media.floor_plan} className={clsx(styles.floorPlan, "w-4/5 mx-auto")} />
      </div>
    </div>
  );
}
