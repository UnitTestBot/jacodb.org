import React from "react";
import { useState } from "react";
import cn from "classnames";

import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import withTrans from "../../../i18n/withTrans";

import { DownloadDropdown } from "../../dropdowns/downloadDropdown/downloadDropdown";
import logo from "../../../images/utbot-logo-white-text.svg";
import * as styles from "./header.module.css";

function Header({ location }) {
  const { t, i18n } = useTranslation();
  const navId = "navbarResponsive";

  const isLanguagePage =
    location &&
        (location.pathname === "/" || location.pathname.match(/\/[cpp|python|js|dotnet](\/)?/g))

  const headerRef = React.useRef(null);
  const [isPinned, setIsPinned] = React.useState(false);
  const [showDownloadFrom, setShowDownloadFrom] = useState(false);

  const showDropdownDownloadFrom = () => {
    setShowDownloadFrom(true);
  };

  const hideDropdownDownloadFrom = () => {
    setShowDownloadFrom(false);
  };

  React.useEffect(() => {
    if (!headerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPinned(entry.intersectionRatio < 1);
      },
      { threshold: [1] }
    );

    observer.observe(headerRef.current);
    // eslint-disable-next-line consistent-return
    return () => {
      observer.unobserve(headerRef.current);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        styles.header,
        (!isLanguagePage || isPinned) && styles.opaque
      )}
    >
      <Container className={styles.container}>
        <Navbar className={styles.navbar} expand="lg" variant="dark">
          <Link className={styles.brand} to="/">
            <Navbar.Brand className={styles.navbarBrand}>
              JA:CO
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls={navId} className={styles.toggle} />

          <Navbar.Collapse id={navId} className={styles.collapse}>
            <Nav
              as="ul"
              className={cn(styles.nav, styles.navTop)}
            >
              <Nav.Item as="li">
                <CustomLink to="/">{t("header.javaArea")}</CustomLink>
              </Nav.Item>
              <Nav.Item as="li">
                <CustomLink to="/demo">{t("header.demo")}</CustomLink>
              </Nav.Item>
              <Nav.Item as="li">
                <CustomLink to="/research">{t("header.research")}</CustomLink>
              </Nav.Item>
              <Nav.Item as="li">
                <CustomLink to="/about">{t("header.aboutUs")}</CustomLink>
              </Nav.Item>
            </Nav>

          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
}

const isActive = (className, to) => ({ isCurrent, location }) => {
  return {
    className: cn(
      className,
      styles.myLink,
      (to === location.pathname || to + "/" === location.pathname) &&
        styles.active
    ),
  };
};

const CustomLink = ({ className, children, to, ...propsCustomLink }) => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Link getProps={isActive(className, to)} to={to} {...propsCustomLink}>
    {children}
  </Link>
);

export default withTrans(Header);
