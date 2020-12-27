import React from "react";
import Link from "next/link";
import { NavLinks } from "../nav/NavLinks";

function Header() {
  return (
    <header className="relative my-1">
      <div className="absolute" style={{ bottom: "0", width: "100%" }}>
        <nav className="container mx-auto px-4 flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
          <Link href="/">
            <h3 className="text-bold">Realstate Brand</h3>
          </Link>
          <div>
            <NavLinks />
          </div>
        </nav>
      </div>
    </header>
  );
}
export default Header;
