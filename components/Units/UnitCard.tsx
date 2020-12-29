import React from "react";
import useTranslation from "../../hooks/useTranslation";
import Carousel from "react-elastic-carousel";

export const UnitCard = ({ unit }: { unit: any }) => {
  const { locale } = useTranslation();
  return (
    <div className="w-1/3 flex">
      <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg flex-1">
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
                style={{ maxHeight: "250px" }}
                src={image}
                alt="unit image"
              />
            );
          })}
        </Carousel>

        <div className="px-6 py-4">
          <h4 className="text-purple-500 mb-2">
            {locale === "ar" ? unit.sk_city.name_ar : unit.sk_city.name}
          </h4>
          <p className="text-gray-700 text-base">
            Compound: {unit.compound.name[locale]}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Bedrooms: {unit.bedrooms}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Bathrooms: {unit.bathrooms}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Bua: {unit.bua}
          </span>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span>Total Price: {unit.fin_total} Usd</span>
        </div>
        {/* <p>{unit.slug_ar}</p> */}
      </div>
    </div>
  );
};
