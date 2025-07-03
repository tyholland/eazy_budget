import React from "react";
import * as S from './footer.style.ts';
import Link from "../../components/Link/Link.tsx";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <S.Wrapper>
      <hr />
      <S.Links>
        <Link url="/" label="Home" linkSize="medium">
          Home
        </Link>
        <Link url="/about" label="About" linkSize="medium">
          About
        </Link>
        {/* <Link url="/pricing" label="Pricing" linkSize="medium">
          Pricing
        </Link> */}
        <Link url="/privacy" label="Privacy Policy" linkSize="medium">
          Privacy Policy
        </Link>
        <Link url="/contact" label="Contact Us" linkSize="medium">
          Contact Us
        </Link>
      </S.Links>
      <S.Copyright>
        &copy; {year} Simple Budgeting. All rights reserved.
      </S.Copyright>
    </S.Wrapper>
  )
}

export default Footer;