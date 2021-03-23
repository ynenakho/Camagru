import { ChangeEvent, FC } from 'react';

type Props = {
  icon: string;
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string;
};

const InputField: FC<Props> = ({
  icon,
  label,
  type,
  name,
  value,
  onChange,
  error,
}: Props) => {
  return (
    <div className="input-field-wrapper">
      <div className="icon-input-wrapper">
        {icon && <i className="material-icons">{icon}</i>}
        <div className="input-error-wrapper">
          <input
            name={name}
            type={type}
            autoComplete="off"
            placeholder={label}
            onChange={onChange}
            value={value}
            className={error ? 'invalid' : ''}
          />
          {error && <div className="text-error">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default InputField;
