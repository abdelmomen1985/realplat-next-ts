import React from "react";
import useTranslation from "../../../hooks/useTranslation";

export default function FinancialAnalysis({ unit }: { unit: any }) {
  const { t, locale } = useTranslation();

  return (
    <div className="border-gray-300 rounded-md shadow-md">
      <h3 className="mb-3 py-4 w-100 px-5 rounded-md text-text-secondary flex justify-start items-center"
        style={{ backgroundColor: '#F5F6F7' }}
      >
        <img src="/images/dollar.png" />
        <span className="text-2xl font-medium mx-4 capitalize">Financial Details</span>
      </h3>
      <ul className="list-disc my-5 py-4 px-5 mx-3">
        <li className="my-2 text-text-secondary text-lg font-medium">Price per SQMT: {(unit.fin_total / unit.land).toFixed()} {t('egp')}</li>
        <li className="my-2 text-text-secondary text-lg font-medium">Total Price: {(unit.fin_total).toFixed()} {t('egp')}</li>
        <li className="my-2 text-text-secondary text-lg font-medium">NPV: {(unit.npv).toFixed()} {t('egp')}</li>

      </ul>
    </div>
  );
}
