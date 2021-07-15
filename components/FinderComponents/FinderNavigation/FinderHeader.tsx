import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import classes from "../FinderExpoSections/finderExpo.module.scss";
import useTranslation from "./../../../hooks/useTranslation";
import styles from "./finder-nav.module.scss";
import FinderNavLinks from "./FinderNavLinks";
const FinderHeader = () => {
  const { locale } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const mobileMenu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1023) {
        setIsMobileMenuOpen(false);
      }
    });

    return () => {
      window.removeEventListener("resize", () => setIsMobileMenuOpen(false));
    };
  }, []);
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleClick = (e: any) => {
    if (mobileMenu?.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setIsMobileMenuOpen(false);
  };
  return (
    <header className={clsx(styles.navBar, "relative ")}>
      <nav className={styles.menu}>
        <Link href={`/${locale}/`}>
          <a
            className={clsx(
              classes.publicsansBoldMirage_26px,
              styles.mellwLogo,
              classes.valignTextMiddle,
              "md:m-0 m-4"
            )}
          >
            mellw{" "}
          </a>
        </Link>
        <div
          ref={mobileMenu}
          className={
            "pt-2 hidden lg:flex flex-wrap lg:flex-row flex-col justify-between w-full" +
            (isMobileMenuOpen ? " mobile-menu " : "")
          }
        >
          <FinderNavLinks />
        </div>

        <div className="cursor-pointer block lg:hidden bg-transparent border-none focus:outline-none outline-none">
          <FontAwesomeIcon
            className=" text-black font-medium text-lg hover:text-primary m-4"
            icon={faBars}
            onClick={() => {
              setIsMobileMenuOpen((prev) => !prev);
            }}
          />
        </div>
      </nav>
      <div className={clsx(styles.right)}>
        <button
          className={clsx(
            classes.notosansBoldOutrageousOrange_14px,
            styles.navBtn
          )}
        >
          <img src="/images/finder/user.svg" />
          <span>Sign in</span>
        </button>
        <button className={clsx("my-4 btn btn-fnd-primary")}>
          New Exhibitor
        </button>
      </div>
    </header>
  );
};

export default FinderHeader;
