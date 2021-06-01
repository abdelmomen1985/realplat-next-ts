import React from "react";
import styles from "./homeStyles.module.scss";
import useTranslation from './../../hooks/useTranslation';
const guides = [
  {
    img: "guide-svgs/guide-icon-1.svg",
    title: {
      en: "Expo guide",
      ar: "دليل العروض"
    },
    link: {
      en: "How to find units",
      ar: "كيف تجد وحدات سكنية"
    }
  },
  {
    img: "guide-svgs/guide-icon-2.svg",
    title: {
      en: "New Projects Guide",
      ar: "دليل المشاريع الجديدة"
    },
    link: {
      en: "How to find projects",
      ar: "كيف تجد المشاريع"
    },
  },
  {
    img: "guide-svgs/guide-icon-3.svg",
    title: {
      en: "Resellers Guide",
      ar: "دليل بائعي التجزئة"
    },
    link: {
      en: "How to sell your unit",
      ar: "كيف تبيع وحدتك السكنية"
    },
  },
];
const achievements = [
  {
    number: 101,
    title: {
      en: "New Units",
      ar: "وحدات سكنية جديدة"
    },
  },
  {
    number: 11,
    title: {
      en: "Recently Sold",
      ar: "بيعت مؤخرًا"
    },
  },
  {
    number: 80,
    title: {
      en: "Consultations",
      ar: "استشارات"
    },
  },
];
const GuidesSection = () => {
  const { t, locale } = useTranslation()
  return (
    <>
      <section className="my-3 w-full relative py-5 bg-secondary">
        <div className="w-full md:w-2/3 my-8 py-7  mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-10">
          <div className="mr-3">
            <h3 className="text-main text-3xl font-semibold my-4 whitespace-no-wrap">
              {t('guideTitle')}
            </h3>
            <p className="font-comfortaa text-black text-opacity-50 text-xl  font-medium">
              {t('guideHeader')}
            </p>
            <button className="block bg-primary text-white text-md mt-5 mb-2 font-medium rounded-lg px-3 py-2 shadow-md mx-auto md:mx-0 ">
              {t('guidesBtn')}
            </button>
          </div>
          <div className="my-3 ml-0 md:my-4 md:ml-3">
            {guides.map((guide, i) => (
              <div key={i} className="flex justify-start items-center mb-5">
                <img className="w-20" src={`/images/${guide.img}`} />
                <div className="ml-3">
                  <h4 className="font-semibold text-2xl text-custom-blue-dark">
                    {guide.title[locale]}
                  </h4>
                  <a className="cursor-pointer text-xl font-medium text-text-secondary">
                    {guide.link[locale]} <span className="text-black">&#8594;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <img src="/images/house.png" className={styles.houseImg} />
      </section>
      <section className="w-full py-6 px-3 my-5 md:my-3">
        <h2 className="text-main my-3 text-2xl md:text-3xl font-semibold text-center">
          What’s happening at mellw.com
        </h2>
        <div className="flex justify-center md:justify-around flex-wrap flex-col md:flex-row items-center">
          {achievements.map((achievement, i) => (
            <div key={i} className="flex justify-center items-center mx-5 my-3">
              <span className={styles.circularFire}></span>
              <div>
                <h4 className="text-3xl font-bold text-center text-custom-blue-light">
                  {achievement.number}
                </h4>
                <h5 className="text-xl font-medium text-center text-custom-blue-light">
                  {achievement.title[locale]}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default GuidesSection;
