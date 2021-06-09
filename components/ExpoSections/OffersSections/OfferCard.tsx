import React from 'react'
import useTranslation from "../../../hooks/useTranslation";
import { useRouter } from "next/router";
import { Offer } from '../../../interfaces'
import clsx from 'clsx';
const OfferCard = ({ offer }: { offer: Offer }) => {
  const { t, locale } = useTranslation();
  const router = useRouter();
  return (
    <div className="my-2 mx-2 rounded-lg shadow-lg">
      <img src={offer.projectImage}
        className="w-full"
        style={{
          maxHeight: "250px",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }} />
      <div className="relative w-full px-3 py-2 cursor-pointer" onClick={() => router.push(`/${locale}/expo/offers/${offer.id}`)}>
        <img src={offer.projectDeveloperLogo} className="absolute top-1 left-10" style={{
          width: '28%',
          bottom: '65%',
          left: '-1%',
        }} />
        <h4 className={clsx("text-center text-xl font-semibold", locale === 'en' ? "ml-12 md:ml-1" : "mr-12 md:mr-1")}>{offer.projectName}</h4>
        <div className="flex justify-start items-center my-4 mx-3">
          <img src="/images/from.png" className={locale === 'en' ? "mr-2" : 'ml-2'} />
          <p className="text-base font-medium text-black">{t('from')}: {offer.startingPrice}</p>
        </div>
        <div className="flex justify-start items-center my-4 mx-3">
          <img src="/images/discount.png" className={locale === 'en' ? "mr-2" : 'ml-2'} />
          <p className="text-base font-medium text-black">{t('discount')}: {offer.discountPer}%</p>
        </div>
      </div>
    </div>
  )
}

export default OfferCard
