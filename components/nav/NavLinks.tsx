import React, { useContext, useState } from "react";
import useTranslation from "../../hooks/useTranslation";
import ActiveLink from "./ActiveLink";
import { AppContext } from "./../../Context/AppContextProvider";
import LocaleSwitcher from "./LocalSwitch";
import styles from "./navigation.module.scss";
import clsx from "clsx";
import UserDropDown from './UserDropDown';
interface User {
  firstName: string;
  lastName: string;
  id?: string;
}
export const NavLinks = (props: any) => {
  const { user, setUser } = useContext(AppContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false)
  const { t, locale } = useTranslation();
  let dummyUser: User = {
    firstName: "ahmned",
    lastName: "sarhan",
    id: user?.id,
  };
  const getUserName = (user: User) => {
    return `${user.firstName.charAt(0).toLocaleUpperCase()}.${user.lastName}`;
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
              <i
                className="fas fa-heart text-custom-red mx-1"
                aria-hidden="true"
              ></i>{" "}
              Wishlist
            </a>
          </ActiveLink>

          <span className="relative">
            <a className={
              clsx(styles.navLink, "mx-5 capitalize cursor-pointer ",
                isUserMenuOpen ? styles.active : ' ')}
              onClick={() => setIsUserMenuOpen(true)}
            >
              <i className="far fa-user mx-1" aria-hidden="true"></i>{" "}
              {getUserName(dummyUser)}
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
