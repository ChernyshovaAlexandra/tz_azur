import React, { ChangeEvent } from 'react';
import useInput from '../../hooks/useInput';

export interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  checked?: boolean;
  invalid?: boolean;
  required?: boolean;
  id?: string;
  validationRules?: (value: string) => string | null;
  maxDate?: any;
  dateFormat?: any;
  countryCodes?: any;
  options?: any;
  code?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  checked,
  id,
  validationRules,
  required,
  countryCodes,
  options,
  code,
  onChange
}) => {
  const { value, handleChange, error } = useInput({
    initialValue: '',
    validationRules: validationRules ? validationRules : null,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event, code);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        className={`${error ? 'invalidInput' : ''}`}
      />
      {error && <p className="errorMessage">{error}</p>}
    </>
  );
};

export default Input;
