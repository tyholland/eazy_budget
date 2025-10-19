import React, { JSX } from "react";
import { ElementSize, LinkClassType } from "../../types.ts";
import * as S from "./link.style.ts";

interface LinkProps {
  children: string | JSX.Element;
  url: string;
  label: string;
  target?: string;
  classType?: LinkClassType;
  linkSize?: ElementSize;
  isDisabled?: boolean;
  callBack?: () => void;
  download?: boolean;
}

const Link = ({
  children,
  linkSize = "small",
  url,
  label,
  target = "_self",
  classType = "text",
  isDisabled = false,
  callBack = () => {},
  download = false,
}: LinkProps) => {
  return (
    <S.LinkElement
      className={`${linkSize} ${classType} ${isDisabled ? "disabled" : ""}`}
      to={url}
      aria-label={label}
      onClick={callBack}
      target={target}
      download={download}
    >
      {children}
    </S.LinkElement>
  );
};

export default Link;
