import React from "react";
import useTranslation from "./../../hooks/useTranslation";

const ServicesSection = () => {
  const { t, locale } = useTranslation();

  const services = [
    {
      title: {
        en: "New Projects",
        ar: "مشروعات جديدة",
      },
      description: {
        en: " With over 1 million+ homes for sale available on the website, Mellw can match you with a house you will want to call home.",
        ar: "مع أكثر من 1 مليون منزل معروض للبيع على الموقع الإلكتروني ، يمكن لـ Mellw أن تتطابق مع المنزل الذي تريد الاتصال به بالمنزل.",
      },
      link: "",
      icon: "images/guide-svgs/new-projects.svg",
      button: {
        ar: "تصفح المشروعات",
        en: "Discover Projects",
      },
    },
    {
      title: {
        en: "best value",
        ar: "أفضل قيمة",
      },
      description: {
        en: " With over 1 million+ homes for sale available on the website, Mellw can match you with a house you will want to call home.",
        ar: "مع أكثر من 1 مليون منزل معروض للبيع على الموقع الإلكتروني ، يمكن لـ Mellw أن تتطابق مع المنزل الذي تريد الاتصال به بالمنزل.",
      },
      link: "",
      icon: "images/guide-svgs/value.svg",
      button: {
        ar: "تصفح المشروعات",
        en: "Discover Projects",
      },
    },
    {
      title: {
        en: "Endless Opportunities",
        ar: "فرص بلا حدود",
      },
      description: {
        en: " With over 1 million+ homes for sale available on the website, Mellw can match you with a house you will want to call home.",
        ar: "مع أكثر من 1 مليون منزل معروض للبيع على الموقع الإلكتروني ، يمكن لـ Mellw أن تتطابق مع المنزل الذي تريد الاتصال به بالمنزل.",
      },
      link: "",
      icon: "images/guide-svgs/opportunities.svg",
      button: {
        ar: "تصفح المشروعات",
        en: "Discover Projects",
      },
    },
  ];
  return (
    <section className="w-full py-2 px-3 my-2">
      <div className="mx-20">
        <h2 className="text-main text-center text-2xl md:text-3xl font-semibold">
          {t("mellwHelp")} ...
        </h2>
        <div className="my-10 grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-5 ">
          {services.map((service, i) => (
            <div
              key={i}
              className="w-4/5 mx-auto flex flex-wrap flex-col justify-center items-center"
            >
              <img
                src={service.icon}
                style={{ width: "90px", height: "90px" }}
                className="max-w-full"
              />
              <h3 className="text-main text-2xl text-center my-3 font-semibold">
                {service.title[locale]}
              </h3>
              <small className="text-sm text-center text-black text-opacity-50 my-2">
                {service.description[locale]}
              </small>
              <button className="btn-primary">{service.button[locale]}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
