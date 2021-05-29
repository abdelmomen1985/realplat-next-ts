import React, { useContext, useState } from "react";
import useTranslation from "../../hooks/useTranslation";
import ActiveLink from "./ActiveLink";
import { AppContext } from "./../../Context/AppContextProvider";
import LocaleSwitcher from "./LocalSwitch";
import styles from "./navigation.module.scss";
import clsx from "clsx";
import UserDropDown from './UserDropDown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faUser as farUser } from "@fortawesome/free-regular-svg-icons";

export const NavLinks = (props: any) => {
  const { user, setUser } = useContext(AppContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false)
  const { t, locale } = useTranslation();

  const getUserName = (username: string) => {
    let fullUsername = username;
    if (fullUsername?.split(' ').length > 1) {
      return fullUsername?.split(' ')[0].charAt(0) + '.' + fullUsername?.split(' ')[1]
    } else {
      return fullUsername;
    }
  };
  // export const NavLinks = () => {
  return (
    <>
      <style jsx>{``}</style>
      <div className="ml-4">
        <ActiveLink activeClassName={styles.active} href={`/${locale}/units`}>
          <a className={clsx(styles.navLink, "ml-12 mr-3")}>Search</a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href={`/${locale}/`}>
          <a className={clsx(styles.navLink, "mx-3")}>New Projects</a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href={`/${locale}/expo`}>
          <a className={clsx(styles.navLink, "mx-3")}>Mellw's Expo</a>
        </ActiveLink>
      </div>
      {!user?.id ? (
        <a
          className={clsx(styles.navLink, "mx-5 cursor-pointer")}
          onClick={() => props.setLoginModal(true)}
        >
          {t("navSign")}
        </a>
      ) : (
        <div>
          <LocaleSwitcher />
          <ActiveLink
            activeClassName={styles.active}
            href={`/${locale}/profile/wishlist`}
          >
            <a className={clsx(styles.navLink, "mx-5")}>
              <FontAwesomeIcon icon={faHeart} className="text-custom-red mx-1" aria-hidden="true" />
              {" "}
              Wishlist
            </a>
          </ActiveLink>

          <span className="relative">
            <a className={
              clsx(styles.navLink, "mx-5 capitalize cursor-pointer ",
                isUserMenuOpen ? styles.active : ' ')}
              onClick={() => setIsUserMenuOpen(true)}
            >
              <FontAwesomeIcon icon={farUser} className="mx-1" aria-hidden="true" />{" "}
              {getUserName(user?.name)}
            </a>
            <UserDropDown show={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />

          </span>

          <a
            className={clsx(styles.navLink, "mx-5 cursor-pointer")}
            onClick={async () => {
              const response = await fetch("/api/sessions", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
              });
              if (response.status === 204) setUser(undefined);
            }}
          >
            {t("navSignOut")}
          </a>
        </div>
      )}
    </>
  );
};
