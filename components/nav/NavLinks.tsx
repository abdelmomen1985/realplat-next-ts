import React from "react";
import Link from "next/link";

export const NavLinks = () => {
  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>{" "}
      |{" "}
      <Link href="/about">
        <a>About</a>
      </Link>{" "}
      |{" "}
      <Link href="/users">
        <a>Users List</a>
      </Link>{" "}
      |{" "}
      <Link href="/api/users">
        <a>Users API</a>
      </Link>{" "}
      |{" "}
      <Link href="/compounds">
        <a>Compounds</a>
      </Link>{" "}
      |{" "}
      <Link href="/units">
        <a>Units</a>
      </Link>
    </>
  );
};
