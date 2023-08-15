import clsx from 'clsx';
import React from 'react';

export interface HelperTextProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {}

export default function HelperText({ className, children, ...rest }: HelperTextProps) {
  return (
    <p className={clsx('text-sm body-text', className)} {...rest}>
      {children}
    </p>
  );
}
