import React, { useContext, useState } from "react";
import useTranslation from "../../hooks/useTranslation";
import ActiveLink from "./ActiveLink";
import { AppContext } from "./../../Context/AppContextProvider";
import LocaleSwitcher from "./LocalSwitch";
import styles from "./navigation.module.scss";
import clsx from "clsx";
import UserDropDown from "./UserDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faUser as farUser } from "@fortawesome/free-regular-svg-icons";

const shortenName = (username: string) => {
  let fullUsername = username;
  if (fullUsername?.split(" ").length > 1) {
    return (
      fullUsername?.split(" ")[0].charAt(0) + "." + fullUsername?.split(" ")[1]
    );
  } else {
    return fullUsername;
  }
};

export const NavLinks = (props: any) => {
  const { user, setUser } = useContext(AppContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const { t, locale } = useTranslation();

  return (
    <>
      <div className="mx-4">
        <ActiveLink activeClassName={styles.active} href={`/${locale}/units`}>
          <a className={clsx(styles.navLink, "mx-2")}> {t("navSearch")} </a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href={`/${locale}/`}>
          <a className={clsx(styles.navLink, "mx-2")}> {t("navProjects")} </a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href={`/${locale}/expo`}>
          <a className={clsx(styles.navLink, "mx-2")}>{t("navExpo")}</a>
        </ActiveLink>
      </div>
      <div>
        <LocaleSwitcher />
        {!user?.id ? (
          <a
            className={clsx(styles.navLink, "mx-4 cursor-pointer")}
            onClick={() => props.setLoginModal(true)}
          >
            {t("navSign")}
          </a>
        ) : (
          <>
            <ActiveLink
              activeClassName={styles.active}
              href={`/${locale}/profile/wishlist`}
            >
              <a className={clsx(styles.navLink, "mx-2")}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-custom-red mx-1"
                  aria-hidden="true"
                />{" "}
                {t("navWishList")}
              </a>
            </ActiveLink>

            <span className="relative">
              <a
                className={clsx(
                  styles.navLink,
                  "mx-4 capitalize cursor-pointer ",
                  isUserMenuOpen ? styles.active : " "
                )}
                onClick={() => setIsUserMenuOpen(true)}
              >
                <FontAwesomeIcon
                  icon={farUser}
                  className="mx-1"
                  aria-hidden="true"
                />{" "}
                {user?.name && shortenName(user?.name)}
              </a>
              <UserDropDown
                show={isUserMenuOpen}
                onClose={() => setIsUserMenuOpen(false)}
              />
            </span>

            <a
              className={clsx(styles.navLink, "mx-2 cursor-pointer")}
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
          </>
        )}
      </div>
    </>
  );
};
