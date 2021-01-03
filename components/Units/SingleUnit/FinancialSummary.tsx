import React from 'react';
import useTranslation from '../../../hooks/useTranslation';

export default function FinancialSummary({ unit }: { unit: any }) {
  const { t, locale } = useTranslation();

  return (
    <div>
      <style jsx>
        {`
          .fin-summary {
            top: 15%;
          }
          @media (max-width: 767px) {
            .fin-summary {
              top: 0 !important;
              right: 0 !important;
              left: 0 !important;
              margin-bottom: 20px;
            }
          }
        `}
      </style>
      <div
        className="relative md:fixed w-full md:w-2/6  rounded-md shadow-xl fin-summary"
        style={{
          top: '15%',
          right: locale === 'en' ? '0.75rem' : 'auto',
          left: locale === 'ar' ? '0.75rem' : 'auto',
        }} // handle responsive
      >
        <div className="bg-indigo-800 text-white shadow-xl">
          <div className="my-5 py-3 px-4">
            <h5>{t('downPay')}</h5>
            <h3 className="font-bold text-2xl">
              {unit.fin_down_payment} {t('dollar')}
            </h3>
          </div>
          <div className="my-5 py-3 px-4">
            <h5>{t('monthlyPay')}</h5>
            <h3 className="font-bold text-2xl">
              {unit.fin_monthly_payment} {t('dollar')}
            </h3>
          </div>
          <div className="my-5 py-3 px-4">
            <h5>{t('duration')}</h5>
            <h3 className="font-bold text-2xl">
              {unit.fin_years} {t('years')}
            </h3>
          </div>
        </div>
        <div className="flex flex-wrap py-2 justify-between mx-auto px-3 ">
          <button className="bg-indigo-800 text-white rounded-sm py-3 px-5 font-bold text-xl">
            {t('contactSales')}
          </button>
          <button className="border border-indigo-800 font-bold text-xl text-indigo-800 rounded-sm py-3 px-10">
            <i className="fas fa-share-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
