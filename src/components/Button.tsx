import clsx from "clsx";
import React from "react";
import styles from "styles/Button.module.css";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...rest }, ref) => (
  <button className={clsx(className, styles.button)} ref={ref} {...rest}>
    {children}
  </button>
));

Button.displayName = "Button";
export default Button;
