import clsx from "clsx";
import React from "react";
import styles from "styles/Label.module.css";

function Label({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>) {
  return (
    <label className={clsx(styles.label, className)} {...rest}>
      {children}
    </label>
  );
}

export default Label;
