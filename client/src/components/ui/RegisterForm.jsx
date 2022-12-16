import React, {useEffect, useState} from 'react';
import {validator} from '../../utils/validator';
import {useParams} from 'react-router-dom';
import TextFieldAuth from '../common/form/TextFieldAuth';
import CheckBoxField from '../common/form/CheckBoxField';
import DropdownInfo from '../common/form/DropdownInfo';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthErrors, signUp} from '../../store/usersSlice';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const loginError = useSelector(getAuthErrors());

    const [data, setData] = useState({
        email: '',
        name: '',
        password: '',
        // role: '',
        adminPassword: '',
        licence: false,
    });

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
            isCapitalSymbol: {
                message: 'Пароль должен содержать хотя бы одну заглавную букву',
            },
            isContainDigit: {
                message: 'Пароль должен содержать хотя бы одно число',
            },
            min: {
                message: 'Пароль должен состоять минимум из 8 символов',
                value: 8,
            },
        },
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения',
            },
            min: {
                message: 'Имя должно состоять минимум из 3 символов',
                value: 3,
            },
        },
        licence: {
            isRequired: {
                message:
                    'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения',
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
        if (params.admin) data.role = 'ADMIN';
        console.log('data', data);
        dispatch(signUp(data));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='hero'>
                <div className='hero-content flex-col lg:flex-row-reverse'>
                    <div className='text-center lg:text-left'>
                        <h1 className='text-3xl font-bold'>
                            Зарегистрироваться
                        </h1>
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
                            label='Имя'
                            type='name'
                            name='name'
                            onChange={handleChange}
                            value={data.name}
                            error={errors.name}
                        />
                        <TextFieldAuth
                            label='Пароль'
                            type='password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            error={errors.password}
                        />
                        {params.admin ? (
                            <TextFieldAuth
                                label='Пароль админа'
                                type='password'
                                name='adminPassword'
                                onChange={handleChange}
                                value={data.adminPassword}
                            />
                        ) : null}
                        <CheckBoxField
                            value={data.licence}
                            onChange={handleChange}
                            name='licence'
                            error={errors.licence}
                        >
                            Подтвердить лицензионное соглашение
                            <DropdownInfo text='Лицензионное соглашение' />
                        </CheckBoxField>
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

export default RegisterForm;
