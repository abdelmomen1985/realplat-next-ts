import React, { useContext } from "react";
import { useRouter } from "next/router";
import useTranslation from "../../hooks/useTranslation";
import clsx from "clsx";
import { AppContext } from "../../Context/AppContextProvider";

const MainExpoSection = () => {
  const router = useRouter();
  const { locale } = useTranslation();
  const { filterUnitsByCity } = useContext(AppContext);

  const heroServices = [
    {
      img: "/images/dollar-expo.png",
      title: "Exclusive Deals",
    },
    {
      img: "/images/time-expo.png",
      title: "Limited Time",
    },
    {
      img: "/images/stat-expo.png",
      title: "instant info",
    },
  ];
  return (
    <>
      <section
        className="flex flex-wrap bg-local pt-20 items-end justify-between py-10 pb-16 px-8 mb-4 mx-3 rounded-2xl"
        style={{
          background: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('/images/hero/expo-hero-1.png') center center / cover no-repeat fixed",
          backgroundSize: "cover",
          minHeight: "80vh",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h2 className="text-3xl md:text-6xl text-white py-3  font-medium">
            mellw’s Expo
          </h2>
          <p className="text-md text-white">
            Lovely 4 BR, 2 Bath home with Vaulted Ceilings, Open Concept
            <br />
            Kitchen & Family Room, Solid Flooring throughout (tumbled
            <br />
            Travertine everywhere except BRs which are Wood floors).
          </p>
          <div className="flex flex-wrap items-center justify-between my-3 mx-1">
            {heroServices.map((service, i) => (
              <p key={i} className="flex justify-start items-center text-white">
                <img src={service.img} className="mr-2" />
                <span className="capitalize">{service.title}</span>
              </p>
            ))}
          </div>
          <button
            className="mt-4 mb-10 bg-primary text-white text-lg font-medium w-3/4 px-5 md:px-16  py-3 rounded-3xl shadow-md"
            onClick={() => router.push(`/${locale}/expo/offers`)}
          >
            Register Now
          </button>
        </div>
        <div className="flex flex-wrap justify-center md:justify-between text-center items-center my-3">
          <button className="text-white mx-2 mt-4 mb-10 ">
            <img className="h-10" src="/images/icons/play.svg" />
          </button>
          <button className="text-white mx-2 mt-4 mb-10 ">
            <img className="h-10" src="/images/icons/audio.svg" />
          </button>
        </div>
      </section>
    </>
  );
};

export default MainExpoSection;
