import React, { JSX } from "react";
import { ElementSize, LinkClassType } from "../../types.ts";
import * as S from "./link.style.ts";

interface LinkProps {
  children: string | JSX.Element;
  url: string;
  label: string;
  classType?: LinkClassType;
  linkSize?: ElementSize;
}

const Link = ({
  children,
  linkSize = "small",
  url,
  label,
  classType = "text",
}: LinkProps) => {
  return (
    <S.LinkElement
      className={`${linkSize} ${classType}`}
      to={url}
      aria-label={label}
    >
      {children}
    </S.LinkElement>
  );
};

export default Link;
