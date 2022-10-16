import clsx from "clsx";
import React, { ReactElement } from "react";
import styles from "styles/TextField.module.css";
import ErrorMessage from "./ErrorMessage";
import HelperText from "./HelperText";
import InputBase from "./InputBase";
import Label from "./Label";

export interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
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

export default function TextField({
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
  enterKeyHint,
  type = "text",
  ...rest
}: TextFieldProps): ReactElement {
  const inputId = id || name;
  const helperTextId = helperText && inputId ? `${inputId}-helper-text` : "";
  const errorMessageId =
    errorMessage && inputId ? `${inputId}-error-message` : "";
  const inputLabelId = label && inputId ? `${inputId}-label` : undefined;
  const customInputMode =
    inputMode ||
    (type === "tel" && "tel") ||
    (type === "email" && "email") ||
    (type === "url" && "url") ||
    (type === "number" && "numeric") ||
    undefined;
  return (
    <div className={clsx(styles.textField, className)}>
      <Label htmlFor={inputId} id={inputLabelId} className={labelClassName}>
        {label} {required && " *"}
      </Label>
      {helperText && (
        <HelperText className={helperTextClassName} id={helperTextId}>
          {helperText}
        </HelperText>
      )}
      <InputBase className={inputBaseClassName}>
        <input
          aria-invalid={error}
          id={inputId}
          name={name}
          placeholder={placeholder}
          aria-describedby={clsx(helperTextId, errorMessageId)}
          aria-required={required}
          required={required}
          type={type}
          inputMode={customInputMode}
          {...rest}
          className={clsx(styles.input, inputClassName)}
          enterKeyHint={enterKeyHint}
        />
      </InputBase>
      {errorMessage && (
        <ErrorMessage id={errorMessageId}>{errorMessage}</ErrorMessage>
      )}
    </div>
  );
}
