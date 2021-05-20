import React, { useContext } from "react";
import useTranslation from "../../hooks/useTranslation";
import ActiveLink from "./ActiveLink";
import { AppContext } from "./../../Context/AppContextProvider";
import LocaleSwitcher from "./LocalSwitch";
import styles from "./navigation.module.scss";
import clsx from "clsx";
interface User {
  firstName: string;
  lastName: string;
  id?: string;
}
export const NavLinks = (props: any) => {
  const { user, setUser } = useContext(AppContext);

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
      <div>
        <ActiveLink activeClassName={styles.active} href={`/${locale}/units`}>
          <a className={clsx(styles.navLink, "mx-5")}>Search</a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href={`/${locale}/`}>
          <a className={clsx(styles.navLink, "mx-5")}>New Projects</a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href={`/${locale}/expo`}>
          <a className={clsx(styles.navLink, "mx-5")}>Mellw's Expo</a>
        </ActiveLink>
        <LocaleSwitcher />
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

          <ActiveLink
            activeClassName={styles.active}
            href={`/${locale}/profile`}
          >
            <a className={clsx(styles.navLink, "mx-5 capitalize")}>
              <i className="far fa-user mx-1" aria-hidden="true"></i>{" "}
              {getUserName(dummyUser)}
            </a>
          </ActiveLink>

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
