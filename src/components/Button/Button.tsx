import React from "react";
import { ElementSize, ButtonType } from "../../types.ts";
import * as S from "./button.style.ts";

interface ButtonProps {
  children: string | JSX.Element;
  handleClick: () => void;
  type?: ButtonType;
  buttonSize?: ElementSize;
  disabled?: boolean;
}

const Button = ({
  children,
  buttonSize,
  handleClick,
  disabled = false,
  type,
}: ButtonProps) => {
  return (
    <S.Button
      className={`${buttonSize} ${type}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </S.Button>
  );
};

export default Button;
