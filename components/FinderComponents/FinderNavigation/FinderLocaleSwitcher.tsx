import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import useTranslation from "../../../hooks/useTranslation";
import { locales } from "../../../i18n/config";
import styles from "./finder-nav.module.scss";

const FinderLocaleSwitcher: React.FC = () => {
  const router = useRouter();
  const handleLocaleChange = React.useCallback(
    (lang) => {
      const targetLang = lang;
      const regex = new RegExp(`^/(${locales.join("|")})`);
      router.push(
        router.pathname,
        router.asPath.replace(regex, `/${targetLang}`)
      );
    },
    [router]
  );
  const { locale } = useTranslation();
  return (
    <div
      // style={{ display: "inline-block", outline: "none !important" }}
      className="mx-2 inline-block outline-none focus:outline-none"
    >
      {locale === "en" ? (
        <a
          onClick={() => handleLocaleChange("ar")}
          className={clsx(styles.navLink, "cursor-pointer")}
        >
          العربية
        </a>
      ) : (
        <a
          onClick={() => handleLocaleChange("en")}
          className={clsx(styles.navLink, "cursor-pointer")}
        >
          English
        </a>
      )}
    </div>
  );
};

export default FinderLocaleSwitcher;
