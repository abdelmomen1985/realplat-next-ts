import React from 'react';
import useTranslation from '../../hooks/useTranslation';
import Carousel from 'react-elastic-carousel';

export const UnitCard = ({ unit }: { unit: any }) => {
  const { locale } = useTranslation();
  return (
    <div className="w-1/3 flex">
      <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg flex-1 relative">
        <Carousel
          pagination={false}
          showArrows={false}
          enableAutoPlay={true}
          autoPlaySpeed={1000}
        >
          {unit.media.map((image: any) => {
            return (
              <img
                key={image}
                className="w-full"
                style={{ maxHeight: '250px' }}
                src={image}
                alt="unit image"
              />
            );
          })}
        </Carousel>
        <div
          className="absolute flex justify-between text-sm"
          style={{ top: '10px', width: '100%' }}
        >
          <div
            className="bg-white rounded-md p-3 text-black-500"
            style={{ left: '15px', position: 'absolute' }}
          >
            <i className="fas fa-calendar"></i> {unit.delivery_year}
          </div>
          <div
            className="bg-blue-900 rounded-md p-3 text-white"
            style={{ right: '15px', position: 'absolute' }}
          >
            <i className="fas fa-home"></i> {unit.property_type.name[locale]}
          </div>
        </div>
        <div className="px-6 py-4 flex justify-between">
          <div>
            <h4 className="text-purple-500">
              {locale === 'ar' ? unit.sk_city.name_ar : unit.sk_city.name}
            </h4>
          </div>
          <div>
            <p className="text-gray-700 text-base">
              Compound: {unit.compound.name[locale]}
            </p>
          </div>
        </div>

        <div className="px-6 py-2 flex justify-between">
          <div className="px-6 pt-2 pb-2">
            <h3 style={{ color: '#000', fontWeight: '600' }}>
              {' '}
              {unit.fin_total} $
            </h3>
            <h5
              className="text-gray-600"
              style={{ color: '#c4c4c4', fontWeight: '600' }}
            >
              Total Price
            </h5>
          </div>
          <div className="px-6 pt-2 pb-2">
            <h3 style={{ color: '#000', fontWeight: '600' }}>
              {unit.fin_years} Years
            </h3>
            <h5
              className="text-gray-600"
              style={{ color: '#c4c4c4', fontWeight: '600' }}
            >
              Total Years
            </h5>
          </div>
        </div>
        <hr />
        <div className="px-6 py-4 flex justify-between">
          <div className="px-6 pt-2 pb-2">
            <h3 style={{ color: '#000', fontWeight: '600' }}>
              {' '}
              {unit.fin_down_payment} $
            </h3>
            <h5
              className="text-gray-600"
              style={{ color: '#c4c4c4', fontWeight: '600' }}
            >
              Down Payment
            </h5>
          </div>
          <div className="px-6 pt-2 pb-2">
            <h3 style={{ color: '#000', fontWeight: '600' }}>
              {unit.fin_monthly_payment} $
            </h3>
            <h5
              className="text-gray-600"
              style={{ color: '#c4c4c4', fontWeight: '600' }}
            >
              Monthly Payment
            </h5>
          </div>
        </div>
        <hr />
        <div className="px-6 pt-2 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            <i className="fas fa-bed"></i> {unit.bedrooms}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            <i className="fas fa-toilet"></i> {unit.bathrooms}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Bua: {unit.bua}
          </span>
        </div>
        {/* <p>{unit.slug_ar}</p> */}
      </div>
    </div>
  );
};
