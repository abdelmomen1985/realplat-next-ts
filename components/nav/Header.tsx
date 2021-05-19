import Link from 'next/link';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLinks } from './NavLinks';
import AuthModal from '../Auth/AuthModal';
import LocaleSwitcher from './LocalSwitch';
import { AppContext } from '../../Context/AppContextProvider';
function Header() {
  // const [loginModal, setLoginModal] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { loginModal, setLoginModal } = useContext(AppContext);
  const mobileMenu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    });

    return () => {
      window.removeEventListener('resize', () => setIsMobileMenuOpen(false));
    };
  }, []);
  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
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
      <header className="relative my-3 p-2 pb-4">
        <div style={{ bottom: '0', width: '100%' }}>
          <nav className="container mx-auto px-4 flex flex-row justify-between space-y-3 md:space-y-0">
            <h1
              className="text-bold text-2xl p-0.5 cursor-pointer"
              style={{ padding: '0.125rem' }}
            >
              <Link href="/">
                <a>Mellw</a>
              </Link>
            </h1>
            <div
              ref={mobileMenu}
              className={
                'pt-2 hidden md:flex flex-wrap md:flex-row flex-col md:justify-between  w-full ' +
                (isMobileMenuOpen ? 'mobile-menu ' : '')
              }
            >
              <NavLinks
                setLoginModal={setLoginModal}
                setAuthenticated={setAuthenticated}
              />

            </div>

            <div className="cursor-pointer block md:hidden bg-transparent border-none focus:outline-none outline-none">
              {isMobileMenuOpen ? (
                <i
                  className="fas fa-times text-black font-medium text-lg hover:text-indigo-800"
                  onClick={() => {
                    console.log('clicking');
                    setIsMobileMenuOpen(false);
                  }}
                ></i>
              ) : (
                <i
                  className="fas fa-bars hover:text-indigo-800 text-black font-medium text-xl"
                  onClick={() => {
                    console.log('clicking');
                    setIsMobileMenuOpen(true);
                  }}
                ></i>
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