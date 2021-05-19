import React from 'react'
import useTranslation from "../../../hooks/useTranslation";

const DaysMarket = () => {
  // const { t, locale } = useTranslation();

  return (
    <div className="border-gray-300 rounded-md shadow-md">
      <h3 className="mb-3 py-4 w-100 px-5 rounded-md text-text-secondary flex justify-start items-center"
        style={{ backgroundColor: '#F5F6F7' }}
      >
        <img src="/images/dollar.png" />
        <span className="text-2xl font-medium mx-4 capitalize">Days on Market</span>
      </h3>
      <ul className="list-disc py-4 my-5 px-5 mx-3">
        <li className="my-2 text-text-secondary text-lg font-medium">Days on Market: 14</li>
      </ul>
    </div>
  )
}

export default DaysMarket
