import React from 'react';
import useTranslation from '../../../hooks/useTranslation';

export default function FinancialAnalysis({ unit }: { unit: any }) {
  const { t, locale } = useTranslation();

  return (
    <div className="px-5 py-3">
      <h3
        style={{
          width: '100%',
          textAlign: locale === 'en' ? 'left' : 'right',
          background: 'rgba(149,165,166, 0.5)',
          color: 'rgb(44,62,80)',
          fontSize: '20px',
          fontWeight: '600',
          padding: '5px 10px',
          margin: '15px 3px',
        }}
      >
        {t('finAnalysis')}
      </h3>
      <div className="flex flex-wrap">
        <div className="flex flex-wrap px-2 border-r-2">
          <div className="border rounded-md p-3 text-center">
            <p>{t('totalPrice')}</p>
            <h5>{unit.fin_total}</h5> {t('dollar')}
          </div>
          <div className="text-indigo-800 font-black text-2xl flex items-center">
            {locale === 'en' ? (
              <i className="fas fa-chevron-right"></i>
            ) : (
              <i className="fas fa-chevron-left"></i>
            )}
          </div>
          <div className="border rounded-md p-3 text-center border-indigo-800">
            <p>{t('pricePerM')} </p>
            <h5 className="font-bold">
              {(unit.fin_total / unit.land).toFixed()} {t('dollar')}
            </h5>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="border rounded-md p-3 text-center">
            <p>{t('NPV')}</p>
            <h5>{unit.npv}</h5> {t('dollar')}
          </div>
          <div className="text-indigo-800 font-black text-2xl flex items-center">
            {locale === 'en' ? (
              <i className="fas fa-chevron-right"></i>
            ) : (
              <i className="fas fa-chevron-left"></i>
            )}
          </div>
          <div className="border rounded-md p-3 text-center border-indigo-800">
            <p>{t('NPVPerM')}</p>
            <h5 className="font-bold">
              {(unit.npv / unit.land).toFixed()} {t('dollar')}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
