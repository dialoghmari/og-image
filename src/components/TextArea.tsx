import clsx from 'clsx';
import React, { ReactElement } from 'react';
import styles from 'styles/TextField.module.css';
import ErrorMessage from './ErrorMessage';
import HelperText from './HelperText';
import InputBase from './InputBase';
import Label from './Label';

export interface TextAreaProps
  extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  name: string;
  label: React.ReactNode;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  labelClassName?: string;
  inputBaseClassName?: string;
  inputClassName?: string;
  helperTextClassName?: string;
  errorMessageClassName?: string;
  required?: boolean;
}

export default function TextArea({
  label,
  name,
  id,
  placeholder,
  required = false,
  error = false,
  helperText,
  errorMessage,
  className,
  labelClassName,
  inputBaseClassName,
  inputClassName,
  helperTextClassName,
  errorMessageClassName,
  inputMode,
  ...rest
}: TextAreaProps): ReactElement {
  const inputId = id || name;
  const helperTextId = helperText && inputId ? `${inputId}-helper-text` : '';
  const errorMessageId = errorMessage && inputId ? `${inputId}-error-message` : '';
  const inputLabelId = label && inputId ? `${inputId}-label` : undefined;
  return (
    <div className={clsx(styles.textField, className)}>
      <Label htmlFor={inputId} id={inputLabelId} className={labelClassName}>
        {label} {required && ' *'}
      </Label>
      {helperText && (
        <HelperText className={helperTextClassName} id={helperTextId}>
          {helperText}
        </HelperText>
      )}
      <InputBase className={inputBaseClassName}>
        <textarea
          aria-invalid={error}
          id={inputId}
          name={name}
          placeholder={placeholder}
          aria-describedby={clsx(helperTextId, errorMessageId)}
          aria-required={required}
          required={required}
          {...rest}
          className={clsx(styles.input, inputClassName)}
        />
      </InputBase>
      {errorMessage && <ErrorMessage id={errorMessageId}>{errorMessage}</ErrorMessage>}
    </div>
  );
}
