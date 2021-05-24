import React, { useRef, useEffect } from 'react'
import ActiveLink from './ActiveLink';
import useTranslation from "../../hooks/useTranslation";
import clsx from "clsx";
import styles from "./navigation.module.scss";
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCogs, faMoneyBillWave, faLuggageCart } from "@fortawesome/free-solid-svg-icons";
import { faUser as farUser, faHandshake as farHandShake, faBell as farBell } from "@fortawesome/free-regular-svg-icons";

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
              <FontAwesomeIcon className="text-custom-red mx-2" icon={faHeart} aria-hidden="true" />{" "}
              Wishlist
            </a>
          </ActiveLink>
        </li>
        <li className="my-3 py-1 px-2 mx-auto">
          <ActiveLink href={`/${locale}/profile/wishlist`} activeClassName={styles.active}>
            <a onClick={() => onClose()} className={clsx(styles.navLink, "mx-5 flex justify-center items-center p-0 m-0")}>
              <FontAwesomeIcon icon={faCogs} className="text-primary mx-2" aria-hidden="true" />{" "}
              Settings
            </a>
          </ActiveLink>
        </li>
        <li className="my-3 py-1 px-2 mx-auto">
          <ActiveLink href={`/${locale}/profile/wishlist`} activeClassName={styles.active}>
            <a onClick={() => onClose()} className={clsx(styles.navLink, "mx-5 flex justify-center items-center p-0 m-0")}>
              <FontAwesomeIcon icon={farBell} className="text-primary mx-2" aria-hidden="true" />{" "}
              Notifications
            </a>
          </ActiveLink>
        </li>
        <li className="my-3 py-1 px-2 mx-auto">
          <ActiveLink href={`/${locale}/profile/wishlist`} activeClassName={styles.active}>
            <a onClick={() => onClose()} className={clsx(styles.navLink, "mx-5 flex justify-center items-center p-0 m-0")}>
              <FontAwesomeIcon icon={faMoneyBillWave} className="text-primary mx-1" aria-hidden="true" />{" "}
              Payment Reminder
            </a>
          </ActiveLink>
        </li>
        <li className="my-3 py-1 px-2 mx-auto">
          <ActiveLink href={`/${locale}/profile/wishlist`} activeClassName={styles.active}>
            <a onClick={() => onClose()} className={clsx(styles.navLink, "mx-5 flex justify-center items-center p-0 m-0")}>
              <FontAwesomeIcon icon={faLuggageCart} className="text-primary mx-2" aria-hidden="true" />{" "}
              User Units
            </a>
          </ActiveLink>
        </li>
        <li className="my-3 py-1 px-2 mx-auto">
          <ActiveLink href={`/${locale}/profile/wishlist`} activeClassName={styles.active}>
            <a onClick={() => onClose()} className={clsx(styles.navLink, "mx-5 flex justify-center items-center p-0 m-0")}>
              <FontAwesomeIcon icon={farHandShake} className="text-primary mx-2" aria-hidden="true" />{" "}
              Meetings
            </a>
          </ActiveLink>
        </li>
      </ul>}
    </AnimatePresence>
  )
}

export default UserDropDown
