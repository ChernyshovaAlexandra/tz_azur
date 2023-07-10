import { useState } from 'react';

interface UseInputOptions {
  initialValue?: string;
  validationRules?: any;
}

interface UseInputResult {
  value: string;
  error: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  isValid: boolean;
}

const useInput = (options: UseInputOptions = {}): UseInputResult => {
  const { initialValue = '', validationRules } = options;
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValue(value);
    validateValue(value);
    // Здесь вы можете сохранить значение в состоянии формы или передать его в родительский компонент
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
