import {
  faCompress,
  faCompressAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
// import Carousel from 'react-elastic-carousel';
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useTranslation from "../../../../hooks/useTranslation";
import { Unit } from "../../../../interfaces";
import styles from "../../FinderExpoSections/finderExpo.module.scss";
const contactBtnsAnimation = {
  hidden: { y: -10, opacity: 0, x: -5 },
  visible: { y: 10, opacity: 1, transition: { duration: 0.4 }, x: 0 },
};
const FinderUnitCard = ({
  unit,
  wishListHandler,
  compareHandler,
  wishlisted,
  canCompare = true,
}: {
  unit: Unit;
  wishListHandler: (val: any, val2: any) => void;
  compareHandler: (val: any, val2: any) => void;
  wishlisted: boolean;
  canCompare?: boolean;
}) => {
  const contactMenu = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [showContactMenu, setShowContactMenu] = useState<boolean>(false);
  //const { isMobile } = useContext(AppContext);
  useEffect(() => {
    if (unit && unit?.media?.length) {
      setImageUrl(unit?.media[0]);
    }
  }, [unit]);
  const singleUnitHandler = () => {
    router.push(
      `/${locale}/finder-units/[unit]/`,
      `/${locale}/finder-units/${unit.id}/`,
      {
        shallow: true,
      }
    );
  };
  const imageErrorHandler = () => {
    setImageUrl("https://i.imgur.com/bDujVXa.jpg");
  };

  const clickHandler = (e: any) => {
    if (contactMenu.current?.contains(e.target)) {
      return;
    }
    setShowContactMenu(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", clickHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className={styles.recommendCard}>
        <div className={styles.header}>
          <div className={styles.badges}>
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-none text-indigo-100 bg-indigo-700 rounded">
              Mellw Offer
            </span>
          </div>

          <img
            className="w-full cursor-pointer object-cover object-center"
            style={{
              height: "230px",
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
            }}
            onClick={singleUnitHandler}
            src={imageUrl!}
            onError={imageErrorHandler}
            alt="unit image"
          />
          {canCompare && (
            <div
              className="absolute flex justify-between text-sm"
              style={{ bottom: "50px", width: "100%" }}
            >
              <div
                className="btn-fnd-primary rounded-md p-3 text-white"
                style={{ right: "15px", position: "absolute" }}
              >
                {!unit.comparing ? (
                  <span
                    className="cursor-pointer"
                    onClick={() => compareHandler(unit, wishlisted)}
                  >
                    <FontAwesomeIcon icon={faCompressAlt} />
                  </span>
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={() => compareHandler(unit, wishlisted)}
                  >
                    <FontAwesomeIcon icon={faCompress} />
                  </span>
                )}
              </div>
            </div>
          )}
          <div
            className="absolute flex justify-between text-sm"
            style={{ top: "10px", width: "100%" }}
          >
            <div
              className="bg-transparent rounded-md p-3 text-black-500"
              style={{ right: "15px", position: "absolute" }}
            >
              {wishlisted ? (
                <span
                  className="cursor-pointer"
                  onClick={() => wishListHandler(unit, wishlisted)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "red", fontSize: "25px" }}
                    aria-hidden="true"
                    className=" text-custom-red hover:text-white hover:text-opacity-50 text-opacity-50 text-2xl"
                  />
                </span>
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={() => wishListHandler(unit, wishlisted)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-white hover:text-red-600 text-opacity-50 text-2xl"
                    aria-hidden="true"
                  />
                </span>
              )}
            </div>
          </div>
        </div>
        <div>
          <div
            className={clsx(
              styles.notosansNormalOutrageousOrange_12px,
              "mt-4",
              "mx-4"
            )}
          >
            RESIDENCIAL
          </div>
          <p
            className={clsx(styles.notosansBoldGunPowder_16px, "mt-2", "mx-4")}
          >
            {unit.bedrooms} {t("bedrooms")} {unit.property_type.name[locale]}{" "}
            {t("in")} {unit.compound.name[locale]} {t("compound")}
          </p>
          <div
            className={clsx(styles.notosansNormalManatee_14px, "mt-2", "mx-4")}
          >
            {unit.compound.name[locale]},{" "}
            {locale === "en" ? unit.sk_city.name : unit.sk_city.name_ar}
          </div>
          <div className={clsx("mt-2", "mx-4", "flex")}>
            <img src="/images/finder/cash.svg" />
            <span className={clsx(styles.notosansBoldDolphin_16px, "mx-2")}>
              EGP {unit.fin_total}
            </span>
          </div>
          <div className="my-4 flex justify-center">
            <img src="/images/finder/divider.svg" />
          </div>
          <div className="my-4 flex justify-center">
            <div className="flex mx-3">
              <span className={clsx("mx-1", styles.notosansNormalDolphin_14px)}>
                {unit.bua} ㎡
              </span>
              <img src="/images/finder/area.svg" />
            </div>
            <div className="flex mx-3">
              <span className={clsx("mx-1", styles.notosansNormalDolphin_14px)}>
                {unit.bedrooms}
              </span>
              <img src="/images/finder/bed.svg" />
            </div>
            <div className="flex mx-3">
              <span className={clsx("mx-1", styles.notosansNormalDolphin_14px)}>
                {unit.bathrooms}
              </span>
              <img src="/images/finder/bath.svg" />
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default FinderUnitCard;
