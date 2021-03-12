import React from 'react';

type Props = {
  labelColor?: string;
  icon: string;
  input: string;
  label: string;
  type: string;
  name?: string;
  meta: { touched: boolean; error: string };
};

export default ({
  labelColor,
  icon,
  input,
  label,
  type,
  name,
  meta: { touched, error },
}: Props) => (
  <div className="input-field invalid">
    {icon && <i className="material-icons prefix">{icon}</i>}
    <input
      {...input}
      type={type}
      autoComplete="off"
      placeholder={label}
      className={touched && error ? 'invalid' : touched ? 'valid' : ''}
    />

    {/* <label className={labelColor} htmlFor={name}>
      {label}
    </label> */}
    {touched && error && <span className="helper-text" data-error={error} />}
  </div>
);
