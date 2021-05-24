import Link from "next/link";
import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLinks } from "./NavLinks";
import AuthModal from "../Auth/AuthModal";
import { AppContext } from "../../Context/AppContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
function Header() {
  // const [loginModal, setLoginModal] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { loginModal, setLoginModal } = useContext(AppContext);
  const mobileMenu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
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
    <>
      <header className="relative my-2 p-2 pb-4">
        <div style={{ bottom: "0", width: "100%" }}>
          <nav className="container mx-auto px-4 flex flex-row justify-between space-y-3 md:space-y-0">
            <h1
              className="text-bold text-2xl p-0.5 cursor-pointer"
              style={{ padding: "0.125rem" }}
            >
              <Link href="/">
                <img src="/images/mellw.png" alt="Mellw" />
              </Link>
            </h1>
            <div
              ref={mobileMenu}
              className={
                "pt-2 hidden md:flex flex-wrap md:flex-row flex-col md:justify-between  w-full " +
                (isMobileMenuOpen ? "mobile-menu " : "")
              }
            >
              <NavLinks
                setLoginModal={setLoginModal}
                setAuthenticated={setAuthenticated}
              />
            </div>

            <div className="cursor-pointer block md:hidden bg-transparent border-none focus:outline-none outline-none">
              {isMobileMenuOpen ? (
                <FontAwesomeIcon className=" text-black font-medium text-lg hover:text-primary" icon={faBars} onClick={() => {
                  setIsMobileMenuOpen(false);
                }} />
              ) : (
                <FontAwesomeIcon icon={faBars} className="hover:text-primary text-black font-medium text-xl"
                  onClick={() => {
                    setIsMobileMenuOpen(true);
                  }}
                />
              )}
            </div>
          </nav>
        </div>
      </header>
      {loginModal && (
        <AuthModal
          setLoginModal={setLoginModal}
          setAuthenticated={setAuthenticated}
        />
      )}
    </>
  );
}
export default Header;
