import React from "react";
import styles from "styles/ErrorMessage.module.css";

function ErrorMessage({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) {
  return (
    <div className={styles.errorMessage}>
      <p className="text-xs" {...rest}>
        {children}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={12} cy={12} r={10} />
        <line x1={15} y1={9} x2={9} y2={15} />
        <line x1={9} y1={9} x2={15} y2={15} />
      </svg>
    </div>
  );
}

export default ErrorMessage;
