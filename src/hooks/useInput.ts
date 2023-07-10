import { useState } from 'react';

interface UseInputOptions {
  initialValue?: string;
  validationRules?: any;
  code?: string;
}

interface UseInputResult {
  value: string;
  error: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, code?: string) => void;
  reset: () => void;
  isValid: boolean;
}

const useInput = (options: UseInputOptions = {}): UseInputResult => {
  const { initialValue = '', validationRules, code } = options;
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, code?: string) => {
    const { value, name } = event.target;
    setValue(value);
    if (name !== 'phone') {
      validateValue(value);
    } else {
      validateValue(code + value)
    }
  };

  const validateValue = (value: string) => {
    let isValid = true;
    let errorMessage = '';
    if (validationRules && validationRules(value)) {
      isValid = false;
      errorMessage = validationRules(value);
    }
    setIsValid(isValid);
    setError(errorMessage);
  };

  const reset = () => {
    setValue(initialValue);
    setError('');
    setIsValid(true);
  };

  return {
    value,
    error,
    handleChange,
    reset,
    isValid,
  };
};

export default useInput;
