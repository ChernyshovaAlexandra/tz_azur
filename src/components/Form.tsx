import React, { useEffect, useState } from 'react';
import { countryCodes, formData } from '../assets/lib';
import Input, { InputProps } from './UI/Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { FormValues } from '../App';


interface FirstScreenProps {
    setPage: (page: number) => void;
    setFormValues: (values: React.SetStateAction<FormValues>) => void;
    formValues: FormValues
}

const FirstScreen: React.FC<FirstScreenProps> = ({ setPage, setFormValues, formValues }) => {
    const [startDate, setStartDate] = useState(new Date('November, 14, 2020'));
    const [selectedCode, setCode] = useState(countryCodes[0].code);
    const [selectMenu, toggleMenu] = useState(true);

    const [isFormValid, setFormValid] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setPage(3)
    };

    useEffect(() => {
        validateForm();
    }, [formValues]);




    const isValidInput = (value: any, validationRules: (value: any) => string | null) => {
        return validationRules(value)
    };

    const validateForm = () => {
        let valid = true;
        formData.forEach((item) => {
            if (item.input.required) {
                const { name, validationRules } = item.input;
                if (validationRules) {
                    valid = !isValidInput(formValues[name], item.input.validationRules)
                }
                if (!formValues[name]) {
                    valid = false;
                }

            }
        });

        setFormValid(valid);
    };



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleRadioChange = (name: string, value: string) => {
        setSelectedRadio(value);
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const renderInput = (input: InputProps) => {
        const { type, name, id, validationRules, required } = input;

        if (type === 'select') {
            return (
                <select name={name} id={id} onChange={handleInputChange}>
                    {input.options.map((option: any, id: any) => (
                        <option value={option.value} key={id}>{option.name}</option>
                    ))}
                </select>
            );
        }

        if (type === 'tel') {
            return (
                <div className="grid gap-4 num_grid">
                    <div className="input_elem select" onClick={() => toggleMenu(!selectMenu)}>
                        <ul className="select_code">
                            {input.countryCodes.map((code: any, id: any) => (
                                <li
                                    className={`${selectedCode == code.code ? 'active' : ''} 
                                        ${selectMenu && selectedCode !== code.code ? 'hidden' : ''}`}
                                    key={id}
                                    onClick={() => {
                                        setCode(code.code);
                                        setFormValues((prevValues) => ({
                                            ...prevValues,
                                            phone: selectedCode + formValues?.phone?.substring(4),
                                        }));
                                    }}
                                >
                                    <span className={code.flag}></span>
                                    <span>{code.code}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Input
                        type={input.type}
                        name={input.name}
                        code={selectedCode}
                        validationRules={input.validationRules}
                        onChange={(e) => {
                            setFormValues((prevValues: FormValues) => ({
                                ...prevValues,
                                [name]: selectedCode + e.target.value,
                            }));
                        }}
                    />
                    
                </div>
            );
        }

        if (type === 'DatePicker') {
            return (
                <DatePicker
                    onChange={(date) => {
                        if (date != null) {
                            setStartDate(date);
                            setFormValues((prevValues) => ({ ...prevValues, [name]: date }));
                        }
                    }}
                    selected={startDate}
                    placeholderText={input.placeholder}
                    maxDate={input.maxDate}
                    name={name}
                    dateFormat={input.dateFormat}
                />
            );
        }

        if (name === 'bornInWeek') {
            return <></>;
        }

        return (
            <Input
                required={required}
                type={type}
                name={name}
                id={id}
                validationRules={validationRules}
                onChange={handleInputChange}
            />
        );
    };

    const renderRadioInputs = (input: any) => {
        return input.items.map((radio: any, index: any) => (
            <div key={index}>
                <Input
                    checked={formValues.lessThan37Weeks === radio.value}
                    type="radio"
                    name={input.name}
                    id={radio.id}
                    onChange={() => handleRadioChange(radio.name, radio.value)}
                />
                <label htmlFor={radio.id}>{radio.label}</label>
            </div>
        ));
    };

    return (
        <form onSubmit={handleSubmit}>
            {formData.map((item, id) => (
                <div className={`input_elem ${item.class || ''}`} key={id}>
                    {item.input.items ? (
                        <>
                            <label>{item.label.text}</label>
                            {renderRadioInputs(item.input)}
                            {formValues.lessThan37Weeks && (
                                <>
                                    <label htmlFor='bornInWeek'>Born in weeks</label>
                                    <Input
                                        type="number"
                                        name="bornInWeek"
                                        id="bornInWeek"
                                        onChange={handleInputChange}
                                    /></>
                            )}
                        </>
                    ) : (
                        <>
                            <label htmlFor={item.label.for}>{item.label.text}</label>
                            {renderInput(item.input)}
                        </>
                    )}
                </div>
            ))}

            <button disabled={!isFormValid} className="btn" type="submit">
                Next
            </button>
        </form>
    );
};

export default FirstScreen;
