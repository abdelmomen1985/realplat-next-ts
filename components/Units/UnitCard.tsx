import React, { useState, useEffect } from 'react';
import useTranslation from '../../hooks/useTranslation';
// import Carousel from 'react-elastic-carousel';
import { useRouter } from 'next/router';

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
  const { t, locale } = useTranslation();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (unit && unit?.media.length) {
      setImageUrl(unit?.media[0]);
    }
  }, [unit]);
  const singleUnitHandler = (unitId: string) => {
    router.push(`/${locale}/units/[unit]/`, `/${locale}/units/${unitId}/`, {
      shallow: true,
    });
  };
  const imageErrorHandler = () => {
    setImageUrl('https://i.imgur.com/bDujVXa.jpg');
  };

  return (
    <div className="w-full my-3 flex justify-center">
      <div
        className={
          'm-2 max-w-sm rounded-xl overflow-hidden shadow-xl flex-1 relative ' +
          (unit.comparing ? 'bg-primary text-white' : 'bg-white')
        }
      >
        <div className="relative">
          <img
            className="w-full"

            style={{ maxHeight: '250px', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
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
            style={{ bottom: '50px', width: '100%' }}
          >
            <div
              className="bg-primary rounded-md p-3 text-white"
              style={{ right: '15px', position: 'absolute' }}
            >
              {!unit.comparing ? (
                <span
                  className="cursor-pointer"
                  onClick={() => compareHandler(unit, wishlisted)}
                >
                  <i className="fas fa-compress-alt"></i>
                </span>
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={() => compareHandler(unit, wishlisted)}
                >
                  <i className="fas fa-compress"></i>
                </span>
              )}
            </div>
          </div>
        </div>
        <div
          className="absolute flex justify-between text-sm"
          style={{ top: '10px', width: '100%' }}
        >
          <div
            className="bg-transparent rounded-md p-3 text-black-500"
            style={{ right: '15px', position: 'absolute' }}
          >
            {wishlisted ? (
              <span
                className="cursor-pointer"
                onClick={() => wishListHandler(unit, wishlisted)}
              >
                <i
                  className="fas fa-heart text-custom-red hover:text-white hover:text-opacity-50 text-opacity-50 text-2xl"
                  style={{ color: 'red', fontSize: '25px' }}
                  aria-hidden="true"
                ></i>
              </span>
            ) : (
              <span
                className="cursor-pointer"
                onClick={() => wishListHandler(unit, wishlisted)}
              >
                <i
                  className="fas fa-heart text-white hover:text-red-600 text-opacity-50 text-2xl"
                  aria-hidden="true"
                ></i>
              </span>
            )}
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            singleUnitHandler(unit.id);
          }}
        >
          <div className="px-6 py-4 flex justify-between">
            <div>
              <p className="text-lg font-medium font-roboto capitalize text-text-secondary"  >
                {unit.property_type.name[locale]}{' '}
                {t('in')}{' '}
                {unit.compound.name[locale]}{' '}
                {t('compound')}{t('comma')}{' '}
                {unit.bedrooms}{' '} {t('bedrooms')}{' '}
                <br /> {locale === 'en' ? unit.sk_city.name : unit.sk_city.name_ar}
              </p>
              <p className="mt-5 mb-2 text-lg font-medium font-roboto text-text-secondary" >
                {t('downPay')}: {unit.fin_down_payment} {t('egp')}
              </p>
            </div>
          </div>
          <div className="px-6 py-4 flex justify-between items-center" style={{ backgroundColor: '#E5E5E5' }}>
            <span className="flex justify-between items-center px-3 py-1 text-lg font-semibold  mr-2 mb-2 text-text-secondary" >
              <img src="/images/land.png" /> <span className="ml-2">{unit.land}M</span>
            </span>
            <span className="flex justify-between items-center px-3 py-1 text-lg font-semibold  mr-2 mb-2 text-text-secondary" >
              <img src="/images/bed.png" /> <span className="ml-2">{unit.bedrooms}bd</span>
            </span>
            {/* <span className="flex justify-between items-center px-3 py-1 text-lg font-semibold  mr-2 mb-2 text-text-secondary" >
              <img src="/images/garden.png" /> <span className="ml-2">{unit.bedrooms}</span>
            </span> */}
            <span className="flex justify-between items-center px-3 py-1 text-lg font-semibold  mr-2 mb-2 text-text-secondary" >
              <img src="/images/bath.png" /> <span className="ml-2">{unit.bathrooms}ba</span>
            </span>
          </div>
          <div className=" py-6 flex flex-wrap lg:flex-no-wrap justify-center lg:justify-between items-center">
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
        </div>
      </div>
    </div>
  );
};
