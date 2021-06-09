import React, { useState, useEffect, useContext, useRef } from "react";
// import Carousel from 'react-elastic-carousel';
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCompress, faCompressAlt } from "@fortawesome/free-solid-svg-icons";
import clsx from 'clsx'
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion'
import { AppContext } from './../../Context/AppContextProvider';
import useTranslation from "../../hooks/useTranslation";



const contactBtnsAnimation = {
  hidden: { y: -10, opacity: 0, x: -5 },
  visible: { y: 10, opacity: 1, transition: { duration: 0.4 }, x: 0 }
}
export const UnitCard = ({
  unit,
  wishListHandler,
  compareHandler,
  wishlisted,
}: {
  unit: any;
  wishListHandler: (val: any, val2: any) => void;
  compareHandler: (val: any, val2: any) => void;
  wishlisted: boolean;
}) => {
  const contactMenu = useRef<HTMLDivElement>(null)
  const { t, locale } = useTranslation();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [showContactMenu, setShowContactMenu] = useState<boolean>(false);
  const { isMobile } = useContext(AppContext)
  useEffect(() => {
    if (unit && unit?.media.length) {
      setImageUrl(unit?.media[0]);
    }
  }, [unit]);
  const singleUnitHandler = () => {
    router.push(`/${locale}/units/[unit]/`, `/${locale}/units/${unit.id}/`, {
      shallow: true,
    });
  };
  const imageErrorHandler = () => {
    setImageUrl("https://i.imgur.com/bDujVXa.jpg");
  };

  const clickHandler = (e: any) => {
    if (contactMenu.current?.contains(e.target)) {
      return
    }
    setShowContactMenu(false)
  }
  useEffect(() => {
    document.addEventListener('mousedown', clickHandler);
    return () => {
      document.removeEventListener('mousedown', clickHandler)
    }
  }, [])
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-full my-3 flex justify-center">
        <div
          className={
            "m-2 max-w-sm rounded-xl shadow-xl flex-1 relative " +
            (unit.comparing ? "bg-primary text-white" : "bg-white")
          }
        >
          <div className="relative">
            <img
              className="w-full cursor-pointer"
              style={{
                maxHeight: "250px",
                borderTopLeftRadius: "0.5rem",
                borderTopRightRadius: "0.5rem",
              }}
              onClick={singleUnitHandler}
              src={imageUrl}
              onError={imageErrorHandler}
              alt="unit image"
            />
            {/* <Carousel
            pagination={false}
            showArrows={false}
            enableAutoPlay={true}
            autoPlaySpeed={1000}
          >
            {unit.media.map((image: any, key: any) => {
              return (
               
              );
            })}
          </Carousel> */}
            <div
              className="absolute flex justify-between text-sm"
              style={{ bottom: "50px", width: "100%" }}
            >
              <div
                className="bg-primary rounded-md p-3 text-white"
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
          </div>
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
                  <FontAwesomeIcon icon={faHeart} className="text-white hover:text-red-600 text-opacity-50 text-2xl"
                    aria-hidden="true" />
                </span>
              )}
            </div>
          </div>
          <Link
            href={`/${locale}/units/${unit.id}/`}
          >
            <a>
              <div className="px-6 py-4 flex justify-between">
                <div>
                  <p className="text-lg font-medium font-roboto capitalize text-text-secondary">
                    {unit.property_type.name[locale]} {t("in")}{" "}
                    {unit.compound.name[locale]} {t("compound")}
                    {t("comma")} {unit.bedrooms} {t("bedrooms")} <br />{" "}
                    {locale === "en" ? unit.sk_city.name : unit.sk_city.name_ar}
                  </p>
                  <p className="mt-5 mb-2 text-lg font-medium font-roboto text-text-secondary">
                    {t("totalPrice")}: {unit.fin_total} {t("egp")}
                  </p>
                  <p className="mt-5 mb-2 text-lg font-medium font-roboto text-text-secondary">
                    {t("downPay")}: {unit.fin_down_payment} {t("egp")}
                  </p>
                </div>
              </div>
              <div
                className="px-6 py-4 flex justify-between items-center"
                style={{ backgroundColor: "#E5E5E5" }}
              >
                <span className="flex justify-between items-center px-3 py-1 text-lg font-semibold  mr-2 mb-2 text-text-secondary">
                  <img src="/images/land.png" />{" "}
                  <span className="ml-2">{unit.land}M</span>
                </span>
                <span className="flex justify-between items-center px-3 py-1 text-lg font-semibold  mr-2 mb-2 text-text-secondary">
                  <img src="/images/bed.png" />{" "}
                  <span className="ml-2">{unit.bedrooms}bd</span>
                </span>
                {/* <span className="flex justify-between items-center px-3 py-1 text-lg font-semibold  mr-2 mb-2 text-text-secondary" >
              <img src="/images/garden.png" /> <span className="ml-2">{unit.bedrooms}</span>
            </span> */}
                <span className="flex justify-between items-center px-3 py-1 text-lg font-semibold  mr-2 mb-2 text-text-secondary">
                  <img src="/images/bath.png" />{" "}
                  <span className="ml-2">{unit.bathrooms}ba</span>
                </span>
              </div>
            </a>
          </Link>
          <div className=" py-1 flex my-1 flex-wrap lg:flex-no-wrap justify-center md:justify-start items-center">
            <button className="btn-primary capitalize">Book Now</button>
            <button className="btn-outline-primary capitalize" onClick={(e) => { e.stopPropagation(); setShowContactMenu(prev => !prev) }}>Get in touch</button>
            {showContactMenu && <motion.div ref={contactMenu} variants={contactBtnsAnimation} initial="hidden" animate="visible" exit="hidden" style={{
              position: 'absolute',
              bottom: '-9rem',
              right: '-5rem',
              zIndex: 999
            }}>
              <button className="flex justify-center w-full items-center py-2 my-2  px-3 mx-2 text-lg font-medium bg-outline-primary rounded-md text-primary">
                <img className={clsx("mr-0", locale === 'en' ? "md:mr-1" : "md:ml-1")} src="/images/message.png" /> {isMobile ? '' : t('message')}
              </button>
              <button className="flex justify-center w-full items-center py-3 my-2 px-3 mx-2 text-lg font-medium bg-primary rounded-md text-white">
                <img className={clsx("mr-0", locale === 'en' ? "md:mr-1" : "md:ml-1")} src="/images/phone.png" /> {isMobile ? '' : t('call')}
              </button>
              <button className="flex justify-center w-full items-center py-2 my-2  px-3 mx-2 text-lg font-medium bg-outline-primary rounded-md text-primary">
                <img className={clsx("mr-0", locale === 'en' ? "md:mr-1" : "md:ml-1")} src="/images/whatsapp.png" /> {isMobile ? '' : t('whatsapp')}
              </button>
            </motion.div>}
          </div>

        </div>
      </div>
    </AnimatePresence>
  );
};
