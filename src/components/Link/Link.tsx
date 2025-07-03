import React, { JSX } from "react";
import { ElementSize, LinkClassType } from "../../types.ts";
import * as S from "./link.style.ts";

interface LinkProps {
  children: string | JSX.Element;
  url: string;
  label: string;
  classType?: LinkClassType;
  linkSize?: ElementSize;
  isDisabled?: boolean;
  callBack?: () => void;
}

const Link = ({
  children,
  linkSize = "small",
  url,
  label,
  classType = "text",
  isDisabled = false,
  callBack = () => {}
}: LinkProps) => {
  return (
    <S.LinkElement
      className={`${linkSize} ${classType} ${isDisabled ? "disabled" : ""}`}
      to={url}
      aria-label={label}
      onClick={callBack}
    >
      {children}
    </S.LinkElement>
  );
};

export default Link;
