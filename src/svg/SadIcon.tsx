import React from "react";

interface SadIconProps {
  size?: number;
}

const SadIcon = ({ size = 200 }: SadIconProps) => {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <defs>
        <radialGradient
          id="sad-b"
          cx="29.288"
          cy="15.721"
          r="8.9021"
          fx="29.158"
          fy="15.756"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fffcde" offset="0" />
          <stop stopColor="#f6e76a" offset=".64486" />
          <stop stopColor="#ffb738" offset="1" />
        </radialGradient>
        <radialGradient
          id="sad-c"
          cx="25.053"
          cy="39.593"
          r="15.757"
          gradientTransform="matrix(1.25 0 0 -1.25 -6.4794 73.664)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#777" offset="0" />
          <stop offset="1" />
        </radialGradient>
        <radialGradient
          id="sad-a"
          cx="24.714"
          cy="38.571"
          r="19.714"
          gradientTransform="matrix(1 0 0 .33333 0 25.714)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" />
          <stop stopOpacity="0" offset="1" />
        </radialGradient>
      </defs>
      <path
        d="m44.429 38.571a19.714 6.5714 0 1 1 -39.429 0 19.714 6.5714 0 1 1 39.429 0z"
        fill="url(#sad-a)"
        fillRule="evenodd"
        opacity=".53165"
      />
      <path
        transform="matrix(2.0831 0 0 2.0831 -40.547 -16.492)"
        d="m39.775 19.009a8.6621 8.6621 0 1 1 -17.324 0 8.6621 8.6621 0 1 1 17.324 0z"
        fill="url(#sad-b)"
        fillRule="evenodd"
        stroke="#9c8c0a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".48004"
      />
      <path
        transform="matrix(1.9798 0 0 1.9798 -37.331 -14.527)"
        d="m39.775 19.009a8.6621 8.6621 0 1 1 -17.324 0 8.6621 8.6621 0 1 1 17.324 0z"
        fill="none"
        opacity=".67722"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".50511"
      />
      <path
        d="m34.014 32.037c-3.7236-4.164-5.5624-5.6313-9.5518-5.6313-3.9012 0-6.4997 1.688-9.375 5.9848 3.4333-2.3488 5.3096-3.6495 9.1098-3.6495 3.7118 0 5.7511 1.0507 9.8169 3.2959z"
        fill="#fff"
        opacity=".36"
      />
      <path
        d="m34.014 31.33c-3.7236-4.164-5.5624-5.6313-9.5518-5.6313-3.9012 0-6.4997 1.688-9.375 5.9848 3.4333-2.3488 5.3096-3.6495 9.1098-3.6495 3.7118 0 5.7511 1.0507 9.8169 3.2959z"
        fill="url(#sad-c)"
      />
      <g transform="translate(.35355 2.3927)">
        <path
          d="m21.398 15.321c0 2.5-1.125 4.5-2.5 4.5s-2.625-2-2.625-4.5 1.125-4.5 2.5-4.5 2.5 2 2.5 4.5h0.125z"
          fill="#fff"
          opacity=".36"
        />
        <path
          d="m30.689 15.321c0 2.5-1.125 4.5-2.5 4.5s-2.5-2-2.5-4.5 1.125-4.5 2.5-4.5 2.5 2 2.5 4.5z"
          fill="#fff"
          opacity=".36"
        />
        <path d="m21.398 14.696c0 2.5-1.125 4.5-2.5 4.5s-2.5-2-2.5-4.5 1.125-4.5 2.5-4.5 2.5 2 2.5 4.5z" />
        <path d="m30.689 14.696c0 2.5-1.125 4.5-2.5 4.5s-2.5-2-2.5-4.5 1.125-4.5 2.5-4.5 2.5 2 2.5 4.5z" />
      </g>
    </svg>
  );
};

export default SadIcon;
