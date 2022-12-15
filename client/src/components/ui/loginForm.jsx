import React, {useEffect, useState} from 'react';
import {validator} from '../../utils/validator';
import TextFieldAuth from '../common/form/textFieldAuth';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthErrors, login} from '../../store/usersSlice';

const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const loginError = useSelector(getAuthErrors());

    const [errors, setErrors] = useState({});

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
            min: {
                value: 8,
                message: 'Пароль должен быть не менее 8 символов',
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

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(login({payload: data}));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='hero'>
                <div className='hero-content flex-col'>
                    <div className='text-center lg:text-left'>
                        <h1 className='text-3xl font-bold'>Войти</h1>
                    </div>
                    <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
                        <TextFieldAuth
                            label='Электронная почта'
                            type='email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            error={errors.email}
                        />
                        <TextFieldAuth
                            label='Пароль'
                            type='password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            error={errors.password}
                        />
                        {loginError && (
                            <p className='px-4 text-red-500 text-xs italic'>
                                {loginError}
                            </p>
                        )}
                        <button
                            className='btn btn-primary card'
                            disabled={!isValid}
                        >
                            Подтвердить
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
