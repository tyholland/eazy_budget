import React, { JSX } from "react";
import { ElementSize, ButtonType, ButtonClassType } from "../../types.ts";
import * as S from "./button.style.ts";

interface ButtonProps {
  children: string | JSX.Element;
  handleClick?: () => void;
  classType?: ButtonClassType;
  type?: ButtonType;
  buttonSize?: ElementSize;
  disabled?: boolean;
}

const Button = ({
  children,
  buttonSize = "small",
  handleClick = () => {},
  disabled = false,
  classType = "default",
  type = "button",
}: ButtonProps) => {
  return (
    <S.Button
      className={`${buttonSize} ${classType}`}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      aria-label="button click"
    >
      {children}
    </S.Button>
  );
};

export default Button;
