type Props = {
  icon: string;
  input: string;
  label: string;
  type: string;
  meta: { touched: boolean; error: string };
};

const InputField = ({
  icon,
  input,
  label,
  type,
  meta: { touched, error },
}: Props) => (
  <div className="input-field-wrapper">
    <div className="icon-input-wrapper">
      {icon && <i className="material-icons">{icon}</i>}
      <div className="input-error-wrapper">
        <input
          {...input}
          type={type}
          autoComplete="off"
          placeholder={label}
          className={touched && error ? 'invalid' : touched ? 'valid' : ''}
        />
        {touched && error && <div className="text-error">{error}</div>}
      </div>
    </div>
  </div>
);
export default InputField;
