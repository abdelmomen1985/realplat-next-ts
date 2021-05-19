import React, { useState } from "react";
import useTranslation from "../../../hooks/useTranslation";
import styles from './unit.module.scss'
import clsx from 'clsx'
export default function UnitInformation({ unit }: { unit: any }) {
  const { t, locale } = useTranslation();
  const [currentTab, setCurrentTab] = useState<number>(1)
  return (
    <div className="px-5 py-3 grid grid-cols-1 md:grid-cols-2 grid-row-2 md:grid-rows-1 gap-3"
      style={{
        height: '70vh',
        maxHeight: '100%',
      }}
    >
      <div>
        <div className=" py-6 flex my-3 flex-wrap lg:flex-no-wrap justify-center md:justify-start items-center">
          <button className="flex justify-between items-center py-2 my-2 px-3 mx-2 text-lg font-medium bg-primary rounded-md text-white">
            <img className="mr-1" src="/images/phone.png" /> Call
          </button>
          <button className="flex justify-between items-center py-2 my-2  px-3 mx-2 text-lg font-medium bg-outline-primary rounded-md text-primary">
            <img className="mr-1" src="/images/whatsapp.png" /> WhatsApp
          </button>
          <button className="flex justify-between items-center py-2 my-2  px-3 mx-2 text-lg font-medium bg-outline-primary rounded-md text-primary">
            <img className="mr-1" src="/images/message.png" /> Message
          </button>
        </div>
        {unit.description &&
          <div>
            <h3 className="py-2 text-text-secondary font-medium text-2xl">Description</h3>
            <p>{unit.description}</p>
          </div>}
      </div>
      <div className="flex flex-wrap justify-start items-baseline py-6 my-3 relative">
        {/* tabs here */}
        <div className={styles.tab}>
          <button className={clsx(styles.tabBtn, currentTab === 1 && styles.activeBtn)}
            onClick={() => setCurrentTab(1)}
          >
            Unit Info
          </button>
          {currentTab === 1 && (
            <div className={styles.firstTab}>
              <div className={styles.tabContainer}>
                <h3 className="mt-5 mb-3 py-4 w-100 px-3 text-text-secondary flex justify-start items-center"
                  style={{ backgroundColor: '#F5F6F7' }}
                >
                  <img src="/images/compound.png" />
                  <span className="text-2xl font-medium mx-2 capitalize">compound: {unit.compound.name[locale]}</span>
                </h3>
                <div className="flex flex-wrap justify-between px-3 py-4 my-3 items-center">
                  <div>
                    <h4 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center"
                    >
                      <img src="/images/land.png" />
                      <span className="text-xl font-medium mx-2 capitalize">space: {unit.land}{t('meter')}</span>
                    </h4>
                    <h4 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center"
                    >
                      <img src="/images/bath.png" />
                      <span className="text-xl font-medium mx-2 capitalize">bathrooms: {unit.bathrooms}</span>
                    </h4>

                  </div>
                  <div>
                    <h4 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center"
                    >
                      <img src="/images/proptype.png" />
                      <span className="text-xl font-medium mx-2 capitalize">type: {unit.property_type.name[locale]}</span>
                    </h4>
                    <h4 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center"
                    >
                      <img src="/images/bed.png" />
                      <span className="text-xl font-medium mx-2 capitalize">bedrooms: {unit.bedrooms}</span>
                    </h4>

                    {/* <h3 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center"
                    >
                      <img src="/images/garden.png" />
                      <span className="text-xl font-medium mx-2 capitalize">garden: {unit.compound.name[locale]}</span>
                    </h3> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.tab}>
          <button className={clsx(styles.tabBtn, currentTab === 2 && styles.activeBtn)}
            onClick={() => setCurrentTab(2)}
          >
            Delivery Details
          </button>
          {currentTab === 2 && (
            <div className={styles.secondTab}>
              <div className={styles.tabContainer}>
                <h3 className="mt-5 mb-3 py-4 w-100 px-3 text-text-secondary flex justify-start items-center"
                  style={{ backgroundColor: '#F5F6F7' }}
                >
                  <i className="fas fa-calendar text-primary text-2xl font-medium mr-1" aria-hidden="true" />
                  <span className="text-2xl font-medium mx-2 capitalize">Delivery TimeLine</span>
                </h3>
                <div className="flex flex-wrap justify-between px-3 py-4 my-3 items-center">
                  <div>
                    <h4 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center"
                    >
                      <i className="fas fa-calendar text-primary text-xl font-medium mr-1" aria-hidden="true" />
                      <span className="text-xl font-medium mx-2 capitalize">Year: {unit.delivery_year}</span>
                    </h4>
                  </div>
                  <div>
                    <h4 className="mt-3 mb-2 py-4  px-3 text-text-secondary flex justify-start items-center"
                    >
                      <i className="fas fa-calendar text-primary text-xl font-medium mr-1" aria-hidden="true" />
                      <span className="text-xl font-medium mx-2 capitalize">Month: {unit.delivery_month}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
