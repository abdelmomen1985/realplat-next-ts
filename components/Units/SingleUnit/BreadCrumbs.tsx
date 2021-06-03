import React, { useContext } from 'react'
import { Unit } from '../../../interfaces'
import Link from 'next/link'
import { useRouter } from "next/router"
import useTranslation from './../../../hooks/useTranslation';
import { AppContext } from './../../../Context/AppContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const BreadCrumbs = ({ unit }: { unit: any }) => {
  const router = useRouter();
  const { t, locale } = useTranslation()
  const { filterUnitsGlobal } = useContext(AppContext)
  const globalFilterByBreadCrumpHandler = (filterData: any) => {
    filterUnitsGlobal(filterData)
    router.push(`/${locale}/units`);
  }
  return (
    <div className="flex justify-between items-center px-3 md:px-10 bg-secondary my-5 py-4">
      <button className="text-lg font-medium " onClick={() => router.back()}>&#8592; Back</button>
      <div className="flex justify-between items-center">
        <button onClick={() => globalFilterByBreadCrumpHandler({ compound_id: unit.compound?.id })}>
          {unit.compound.name[locale]}
        </button>
        <span className="mx-2" >
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <button onClick={() => globalFilterByBreadCrumpHandler({ sk_district: unit.sk_district?._id })}>
          {locale === 'en' ? unit.sk_district?.name : unit.sk_district?.name_ar}
        </button>
        <span className="mx-2" >
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <button onClick={() => globalFilterByBreadCrumpHandler({ sk_city: unit.sk_city?._id })}>
          {locale === 'en' ? unit.sk_city?.name : unit.sk_city?.name_ar}
        </button>
      </div>
      <div>

      </div>
    </div>
  )
}

export default BreadCrumbs
