import React from 'react';
import useTranslation from '../../../hooks/useTranslation';
import Link from 'next/link';

export default function CompoundNdDeveloper({ unit }: { unit: any }) {
  const { t, locale } = useTranslation();

  return (
    <div className="flex flex-wrap">
      <div className="my-5 bg-blue-100 text-white p-5 mx-5 shadow-md rounded-md">
        <img
          src={unit.compound.media.card_icon}
          style={{
            width: '100px',
            display: 'block',
            margin: '10px auto',
          }}
        />
        <Link
          href={`/${locale}/compounds/[compound]`}
          as={`/${locale}` + '/compounds/' + unit.compound.id}
        >
          <a className="my-2 mx-auto w-11/12 rounded-md text-indigo-800 bg-indigo-300 font-bold text-lg block text-center py-3 px-3 mb-3">
            {' '}
            {t('allUnitsProject')}{' '}
            {locale === 'ar' ? <span>&larr;</span> : <span>&rarr;</span>}
          </a>
        </Link>
      </div>
      <div className="my-5 bg-blue-100 text-white p-5 mx-5 shadow-md rounded-md">
        <img
          src={unit.compound.developer.media.card_icon}
          style={{
            width: '100px',
            display: 'block',
            margin: '10px auto',
          }}
        />
        <Link
          href={`/${locale}/developers/[developer]`}
          as={`/${locale}` + '/developers/' + unit.compound.developer.id}
        >
          <a className="my-2 mx-auto w-11/12 rounded-md text-indigo-800 bg-indigo-300 font-bold text-lg block text-center py-3 px-3 mb-3">
            {t('allProjectsDeveloper')}{' '}
            {locale === 'ar' ? <span>&larr;</span> : <span>&rarr;</span>}
          </a>
        </Link>
      </div>
    </div>
  );
}
