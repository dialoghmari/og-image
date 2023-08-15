import clsx from 'clsx';
import React from 'react';
import styles from 'styles/InputBase.module.css';

function InputBase({
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className={clsx(styles.inputBase, className)} {...rest}>
      {children}
    </div>
  );
}

export default InputBase;
