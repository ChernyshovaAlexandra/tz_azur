import React, { useState } from 'react';
import "./assets/style/main.scss"
import Form from './components/Form';
import Navigation from './components/Navigation';
import ResultPage from './components/ResultPage';
export interface FormValues {
  [key: string]: string | Date | number | null | undefined | boolean;
  name: string;
  dob: Date;
  lessThan37Weeks: boolean;
  childWeightUnit: string;
  childWeight?: number;
  childHeightUnit: string;
  childHeight?: number;
  email: string | null;
  phone: string | null;
}
const App: React.FC = () => {
  const [page, setPage] = useState(0)
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    lessThan37Weeks: false,
    dob: new Date('November, 14, 2020'),
    childWeightUnit: 'kg',
    childHeightUnit: 'cm',
    email: null,
    phone: null,
  });
  return (
    <div className="container">
      <div className='form_content'>
        <Navigation page={page} setPage={setPage} />
        {page === 0 ?
          <> <h1>Get your questions answered by our consultants from the comfort of your home</h1>
            <Form setPage={setPage} formValues={formValues} setFormValues={setFormValues} /></>
          : <ResultPage />
        }
      </div>
    </div>
  );
};

export default App;
