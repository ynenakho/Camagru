import React from 'react';

export default ({
  labelColor,
  icon,
  input,
  label,
  type,
  name,
  meta: { touched, error }
}) => (
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
    {touched && (error && <span className="helper-text" data-error={error} />)}
  </div>
);
