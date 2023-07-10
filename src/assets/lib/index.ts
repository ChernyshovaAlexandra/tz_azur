export const nameValidationRules = (value: string): string | null => {
    if (value.length < 3) {
        return "Minimum name length - 3 characters";
    }
    if (value.length > 20) {
        return "Maximum name length - 20 characters";
    }
    if (value.includes(" ")) {
        return "The name cannot contain spaces";
    }
    return null;
};

export const countryOptions = [
    { value: 'US', label: '+1' },
    { value: 'UK', label: '+44' },
    { value: 'CA', label: '+1' },
    // Добавьте другие коды стран по необходимости
];
export const dobValidationRules = (value: string): string | null => {
    const currentDate = new Date();
    const selectedDate = new Date(value);
    const yesterday = new Date();
    yesterday.setDate(currentDate.getDate() - 1);

    if (selectedDate > yesterday) {
        return "The date of birth cannot be greater than yesterday's date";
    }

    return null;
};

export const bornInWeekValidationRules = (value: string): string | null => {
    if (!/^([2-3][0-6]|[2][0-1])$/.test(value)) {
        return "Enter a value between 20 and 36";
    }
    return null;
};


export const emailValidationRules = (value: string): string | null => {
    if (!/^\S+@\S+\.\S+$/.test(value)) {
        return "Enter a valid email address";
    }
    return null;
};


export const phoneValidationRules = (value: string): string | null => {
    if (!/^\d{8}$/.test(value)) {
        return "Enter a valid phone number";
    }
    return null;
};

export const countryCodes = [
    {
        flag: `fi fi-gr`,
        code: '+120'
    },
    {
        flag: `fi fi-al`,
        code: '+121'
    },
    {
        flag: `fi fi-ar`,
        code: '+122'
    }
]
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const formData = [
    {
        class: 'full',
        input: {
            type: 'text',
            required: true,
            value: '',
            placeholder: 'Alice',
            name: 'name',
            id: 'name',
            validationRules: nameValidationRules
        },
        label: {
            for: 'name',
            text: `Child's name`,

        }
    },
    {
        class: 'full',
        input: {
            type: 'DatePicker',
            maxDate: yesterday,
            placeholder: 'November, 14, 2020',
            dateFormat: "MMMM, d, yyyy",
            name: "dob",
            required: true,
        },
        label: {
            for: 'dob',
            text: `Child's date of birth`,

        }
    },
    {
        class: 'full',
        input: {
            type: 'radio',
            items: [
                {
                    name: 'lessThan37Weeks',
                    id: 'dob0',
                    label: 'No',
                    checked: true,
                    value: false
                },
                {
                    name: 'lessThan37Weeks',
                    id: 'dob1',
                    label: 'Yes',
                    checked: false,
                    value: true
                }
            ]
        },
        label: {
            for: 'lessThan37Weeks',
            text: `Born at less than 37 week?`,

        }
    },
    {
        input: {
            type: 'number',
            name: 'childWeight'
        },
        label: {
            text: `Child's weight`,
            for: 'childWeight'
        }
    },
    {
        input: {
            type: 'select',
            name: 'childWeightUnit',
            options: [
                { name: 'kg', value: 'kg' },
                { name: 'g', value: 'g' }]

        },
        label: {
            text: `Weight unit`,
            for: 'childWeightUnit'
        }
    },
    {
        input: {
            type: 'number',
            name: 'childHeight'
        },
        label: {
            text: `Child's height`,
            for: 'childHeight'
        }
    },
    {
        input: {
            type: 'select',
            name: 'childHeightUnit',
            options: [
                { name: 'cm', value: 'cm' },
                { name: 'feet', value: 'feet' }]
        },
        label: {
            text: `Height unit`,
            for: 'childHeightUnit'
        }
    },
    {
        class: 'full',
        input: {
            required: true,
            type: 'email',
            name: 'email',
            validationRules: emailValidationRules
        },
        label: {
            text: `Email address`,
            for: 'email'
        }
    },
    {
        class: 'full',
        input: {
            required: true,
            type: 'tel',
            name: 'phone',
            validationRules: phoneValidationRules,
            countryCodes: countryCodes,
        },

        label: {
            text: `Phone number`,
            for: 'phone'
        }
    },
]


export const generateRandomDate = (from: Date, to: Date) => {
    let day = new Date(
        from.getTime() +
        Math.random() * (to.getTime() - from.getTime()),
    );
    const m = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const str_op = m[day.getMonth()] + ' ' + day.getDate() + ', ' + day.getFullYear();
    return str_op;
}
