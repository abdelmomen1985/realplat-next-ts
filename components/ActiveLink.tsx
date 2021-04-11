import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import React, { Children, ReactNode } from "react";

type ActiveLinkProps = {
  children: ReactNode;
  activeClassName: string;
  href: string;
};
const ActiveLink = ({ children, activeClassName, href }: ActiveLinkProps) => {
  const { asPath } = useRouter();
  const child = Children.only(children);

  const childClassName = (child as any).props?.className || "";

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const className =
    asPath === href
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link href={href}>
      {React.isValidElement(child) &&
        React.cloneElement(child, {
          className: className || "null",
        })}
    </Link>
  );
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
};

export default ActiveLink;
