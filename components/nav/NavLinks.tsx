import React from 'react';
import Link from 'next/link';
import useTranslation from '../../hooks/useTranslation';
import ActiveLink from './../ActiveLink';

export const NavLinks = () => {
  const { t, locale } = useTranslation();

  return (
    <>
      <style jsx>{`
        .nav-link {
          text-decoration: none;
          font-size: 18px;
          padding-bottom: 5px;
          font-weight: 500;
        }
        .active {
          border-bottom: 3px solid #3c40c6;
          color: #3c40c6;
        }
        .nav-link:hover,
        .nav-link:active {
          border-bottom: 3px solid #3c40c6;
          color: #3c40c6;
        }
      `}</style>
      <ActiveLink activeClassName="active" href={`/${locale}/`}>
        <a className="nav-link mx-2">{t('navHome')}</a>
      </ActiveLink>
      <ActiveLink activeClassName="active" href={`/${locale}/about`}>
        <a className="nav-link mx-2">{t('navAbout')}</a>
      </ActiveLink>
      <ActiveLink activeClassName="active" href={`/${locale}/users`}>
        <a className="nav-link mx-2">Users List</a>
      </ActiveLink>
      <ActiveLink activeClassName="active" href="/api/users">
        <a className="nav-link mx-2">Users API</a>
      </ActiveLink>
      <ActiveLink activeClassName="active" href={`/${locale}/compounds`}>
        <a className="nav-link mx-2">{t('navCompounds')}</a>
      </ActiveLink>
      <ActiveLink activeClassName="active" href={`/${locale}/developers`}>
        <a className="nav-link mx-2">{t('navDevelopers')}</a>
      </ActiveLink>
      <ActiveLink activeClassName="active" href={`/${locale}/units`}>
        <a className="nav-link mx-2">{t('navUnits')}</a>
      </ActiveLink>
    </>
  );
};
