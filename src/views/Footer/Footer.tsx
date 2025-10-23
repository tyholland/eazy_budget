import React, { useEffect, useRef } from "react";
import * as S from "./footer.style.ts";
import Link from "../../components/Link/Link.tsx";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import FacebookIcon from "../../svg/FacebookIcon.tsx";
import InstagramIcon from "../../svg/InstagramIcon.tsx";
import LinkedInIcon from "../../svg/LinkedInIcon.tsx";
import PWAInstall from "@khmyznikov/pwa-install/react-legacy";
import { PWAInstallElement } from "@khmyznikov/pwa-install";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const currentUser = useAtomValue(userAtom);
  const pwaInstallRef = useRef<PWAInstallElement>(null);

  const handlePwa = async () => {
    const hasShownPwa = localStorage.getItem("show-pwa-modal");

    if (!hasShownPwa) {
      localStorage.setItem("show-pwa-modal", "true");
      pwaInstallRef.current?.showDialog(true);
    }
  };

  useEffect(() => {
    handlePwa();
  }, []);

  return (
    <S.Wrapper>
      <hr />
      <S.Links>
        <Link
          url={currentUser ? "/overview" : "/"}
          label="Home"
          linkSize="medium"
          callBack={() => window.scrollTo(0, 0)}
        >
          Home
        </Link>
        <Link
          url="/about"
          label="About"
          linkSize="medium"
          callBack={() => window.scrollTo(0, 0)}
        >
          About
        </Link>
        <Link
          url="/pricing"
          label="Pricing"
          linkSize="medium"
          callBack={() => window.scrollTo(0, 0)}
        >
          Pricing
        </Link>
        <Link
          url="/partner"
          label="Partner with Us"
          linkSize="medium"
          callBack={() => window.scrollTo(0, 0)}
        >
          Partner with Us
        </Link>
        <Link
          url="#"
          label="Download App"
          linkSize="medium"
          callBack={() => pwaInstallRef.current?.showDialog(true)}
        >
          Download App
        </Link>
        <Link
          url="/privacy"
          label="Privacy Policy"
          linkSize="medium"
          callBack={() => window.scrollTo(0, 0)}
        >
          Privacy Policy
        </Link>
        <Link
          url="/contact"
          label="Contact Us"
          linkSize="medium"
          callBack={() => window.scrollTo(0, 0)}
        >
          Contact Us
        </Link>
      </S.Links>
      <S.Links>
        <Link
          url="https://www.facebook.com/people/Simple-Budgeting/61579168717987/"
          label="Simple Budgeting Facebook Page"
          linkSize="medium"
          target="_blank"
        >
          <FacebookIcon />
        </Link>
        <Link
          url="https://www.instagram.com/sbudgeting/"
          label="Simple Budgeting Instagram Account"
          linkSize="medium"
          target="_blank"
        >
          <InstagramIcon />
        </Link>
        <Link
          url="https://www.linkedin.com/company/simple-budgeting"
          label="Simple Budgeting LinkedIn Account"
          linkSize="medium"
          target="_blank"
        >
          <LinkedInIcon />
        </Link>
      </S.Links>
      <S.Copyright>
        &copy; {year} Simple Budgeting. All rights reserved.
      </S.Copyright>
      <PWAInstall
        ref={pwaInstallRef}
        name="Simple Budgeting"
        icon="https://www.sbudgeting.com/images/android-chrome-192x192.png"
      ></PWAInstall>
    </S.Wrapper>
  );
};

export default Footer;
