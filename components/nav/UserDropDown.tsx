import React, { useRef, useEffect } from 'react'
import ActiveLink from './ActiveLink';
import useTranslation from "../../hooks/useTranslation";
import clsx from "clsx";
import styles from "./navigation.module.scss";
import { AnimatePresence, motion } from 'framer-motion';


const UserDropDown = ({ show, onClose }: { show: boolean, onClose: () => void }) => {
  const { t, locale } = useTranslation();
  const menuRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    //  add when mounted
    document.addEventListener('mousedown', handleClick);
    //  clean on unmount
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  const handleClick = (e: any) => {
    // clicked inside the modal
    if (menuRef?.current?.contains(e.target)) {
      return;
    }
    // outside the modal
    onClose();
  };
  return (
    <AnimatePresence>
      {show && <ul className={clsx(styles.dropDownMenu, "list-none bg-white")} ref={menuRef}>
        <li className="my-3 py-1 px-2 mx-auto">
          <ActiveLink href={`/${locale}/profile/wishlist`} activeClassName={styles.active}>
            <a onClick={() => onClose()} className={clsx(styles.navLink, "mx-5 flex justify-center items-center p-0 m-0")}>
              <i
                className="fas fa-heart text-custom-red mx-2"
                aria-hidden="true"
              ></i>{" "}
              Wishlist
            </a>
          </ActiveLink>
        </li>
        <li className="my-3 py-1 px-2 mx-auto">
          <ActiveLink href={`/${locale}/profile/wishlist`} activeClassName={styles.active}>
            <a onClick={() => onClose()} className={clsx(styles.navLink, "mx-5 flex justify-center items-center p-0 m-0")}>
              <i
                className="fas fa-cogs text-primary mx-2"
                aria-hidden="true"
              ></i>{" "}
              Settings
            </a>
          </ActiveLink>
        </li>
        <li className="my-3 py-1 px-2 mx-auto">
          <ActiveLink href={`/${locale}/profile/wishlist`} activeClassName={styles.active}>
            <a onClick={() => onClose()} className={clsx(styles.navLink, "mx-5 flex justify-center items-center p-0 m-0")}>
              <i
                className="far fa-bell text-primary mx-2"
                aria-hidden="true"
              ></i>{" "}
              Notifications
            </a>
          </ActiveLink>
        </li>
        <li className="my-3 py-1 px-2 mx-auto">
          <ActiveLink href={`/${locale}/profile/wishlist`} activeClassName={styles.active}>
            <a onClick={() => onClose()} className={clsx(styles.navLink, "mx-5 flex justify-center items-center p-0 m-0")}>
              <i
                className="fas fa-money-bill-wave text-primary mx-1"
                aria-hidden="true"
              ></i>{" "}
              Payment Reminder
            </a>
          </ActiveLink>
        </li>
        <li className="my-3 py-1 px-2 mx-auto">
          <ActiveLink href={`/${locale}/profile/wishlist`} activeClassName={styles.active}>
            <a onClick={() => onClose()} className={clsx(styles.navLink, "mx-5 flex justify-center items-center p-0 m-0")}>
              <i
                className="fas fa-luggage-cart text-primary mx-2"
                aria-hidden="true"
              ></i>{" "}
              User Units
            </a>
          </ActiveLink>
        </li>
        <li className="my-3 py-1 px-2 mx-auto">
          <ActiveLink href={`/${locale}/profile/wishlist`} activeClassName={styles.active}>
            <a onClick={() => onClose()} className={clsx(styles.navLink, "mx-5 flex justify-center items-center p-0 m-0")}>
              <i
                className="far fa-handshake text-primary mx-2"
                aria-hidden="true"
              ></i>{" "}
              Meetings
            </a>
          </ActiveLink>
        </li>
      </ul>}
    </AnimatePresence>
  )
}

export default UserDropDown
