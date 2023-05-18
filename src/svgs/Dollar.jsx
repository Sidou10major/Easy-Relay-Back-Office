import React from "react";

function Dollar({ color }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0V0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9971 12.1208 17.1533 14.154 15.6536 15.6536C14.154 17.1533 12.1208 17.9971 10 18V18ZM10.31 9.14C8.54001 8.69 7.97 8.2 7.97 7.47C7.97 6.63 8.76 6.04 10.07 6.04C11.45 6.04 11.97 6.7 12.01 7.68H13.72C13.7042 6.97569 13.449 6.29776 12.9964 5.7579C12.5437 5.21804 11.9208 4.84845 11.23 4.71V3H8.9V4.69C8.18708 4.75985 7.52217 5.08077 7.02395 5.59548C6.52573 6.11018 6.22662 6.78518 6.18 7.5C6.18 9.29 7.67 10.19 9.84 10.71C11.79 11.17 12.18 11.86 12.18 12.58C12.18 13.11 11.79 13.97 10.08 13.97C8.48 13.97 7.85 13.25 7.76 12.33H6.04C6.09832 13.0799 6.4155 13.7862 6.93724 14.328C7.45898 14.8698 8.15283 15.2134 8.9 15.3V17H11.24V15.33C12.76 15.04 13.96 14.17 13.97 12.56C13.96 10.36 12.07 9.6 10.31 9.14V9.14Z"
        fill={color}
      />
    </svg>
  );
}

export default Dollar;
