import React, {useEffect, useState} from 'react';
import {validator} from '../../utils/validator';
import {useNavigate} from 'react-router-dom';
import TextField from '../common/form/textField';

const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false,
    });
    const history = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения',
            },
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения',
            },
        },
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);

    console.log('data', data);
    const isValid = Object.keys(errors).length === 0;

    // eslint-disable-next-line no-unused-vars
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        // eslint-disable-next-line no-unused-vars
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : '/';
    };

    return (
        <div className='hero'>
            <div className='hero-content flex-col lg:flex-row-reverse'>
                <div className='text-center lg:text-left'>
                    <h1 className='text-5xl font-bold'>Войти</h1>
                </div>
                <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
                    <TextField
                        label='Электронная почта'
                        type='email'
                        name='email'
                        onChange={handleChange}
                        value={data.email}
                        error={errors.email}
                    />
                    <TextField
                        label='Пароль'
                        type='password'
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                        error={errors.password}
                    />
                    <button
                        className='btn btn-primary card'
                        disabled={!isValid}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
