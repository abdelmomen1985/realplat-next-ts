import React from 'react';
import Link from 'next/link';

function Header(props) {
  return (
    <header className="relative my-1">
      <div className="absolute" style={{ bottom: '0', width: '100%' }}>
        <nav className="container mx-auto px-4 flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
          <Link href="/">
            <h3 className="text-bold">Realstate Brand</h3>
          </Link>
          <div>
            <Link href="/">
              <a>Home</a>
            </Link>{' '}
            |{' '}
            <Link href="/about">
              <a>About</a>
            </Link>{' '}
            |{' '}
            <Link href="/users">
              <a>Users List</a>
            </Link>{' '}
            |{' '}
            <Link href="/api/users">
              <a>Users API</a>
            </Link>{' '}
            |{' '}
            <Link href="/compounds">
              <a>Compounds</a>
            </Link>{' '}
            |{' '}
            <Link href="/units">
              <a>Units</a>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
export default Header;
