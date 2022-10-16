import clsx from "clsx";
import React, { ReactElement } from "react";
import styles from "styles/SelectField.module.css";
import ErrorMessage from "./ErrorMessage";
import HelperText from "./HelperText";
import InputBase from "./InputBase";
import Label from "./Label";

export interface SelectFieldProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  name: string;
  label: string;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  labelClassName?: string;
  inputBaseClassName?: string;
  inputClassName?: string;
  helperTextClassName?: string;
  errorMessageClassName?: string;
  required?: boolean;
  align?: "start" | "end" | "center";
}

function SelectField({
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
  align = "start",
  children,
  ...rest
}: React.PropsWithChildren<SelectFieldProps>): ReactElement {
  const inputId = id || name;
  const helperTextId = helperText && inputId ? `${inputId}-helper-text` : "";
  const errorMessageId =
    errorMessage && inputId ? `${inputId}-error-message` : "";
  const inputLabelId = label && inputId ? `${inputId}-label` : undefined;
  return (
    <div className={clsx(styles.selectField, className)}>
      <Label htmlFor={inputId} id={inputLabelId} className={labelClassName}>
        {label} {required && " *"}
      </Label>
      {helperText && (
        <HelperText className={helperTextClassName} id={helperTextId}>
          {helperText}
        </HelperText>
      )}
      <InputBase className={inputBaseClassName}>
        <select
          aria-invalid={error}
          id={inputId}
          name={name}
          placeholder={placeholder}
          aria-describedby={clsx(helperTextId, errorMessageId)}
          aria-required={required}
          required={required}
          {...rest}
          className={clsx(styles.select, inputClassName)}
        >
          {children}
        </select>
      </InputBase>
      {errorMessage && (
        <ErrorMessage id={errorMessageId}>{errorMessage}</ErrorMessage>
      )}
    </div>
  );
}
export default SelectField;
