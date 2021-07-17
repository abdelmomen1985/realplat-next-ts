import clsx from "clsx";
import React from "react";
import useTranslation from "./../../../hooks/useTranslation";
import ActiveLink from "./../../nav/ActiveLink";
import styles from "./finder-nav.module.scss";
import FinderLocaleSwitcher from "./FinderLocaleSwitcher";

export default function FinderNavLinks() {
  const { locale } = useTranslation();
  return (
    <div className={clsx(styles.lang, "md:flex")}>
      {/* <div className={clsx(styles.navLink, 'mx-3')}>
						Eng
					</div> */}

      <ActiveLink
        href={`/${locale}/finder-expo`}
        activeClassName={styles.active}
      >
        <a className={clsx(styles.navLink, "mx-3")}>Mellw Expo</a>
      </ActiveLink>

      <ActiveLink href={`/${locale}/help`} activeClassName={styles.active}>
        <a className={clsx(styles.navLink, "mx-3")}>Help </a>
      </ActiveLink>

      <ActiveLink
        href={`/${locale}/finder-units`}
        activeClassName={styles.active}
      >
        <a className={clsx(styles.navLink, "mx-3")}>Explore</a>
      </ActiveLink>

      <ActiveLink href={`/${locale}/blog`} activeClassName={styles.active}>
        <a className={clsx(styles.navLink, "mx-3")}>Blog</a>
      </ActiveLink>

      <FinderLocaleSwitcher />
    </div>
  );
}
