import React, {useEffect, useState} from 'react';
import {validator} from '../../utils/validator';
import {useNavigate} from 'react-router-dom';
import TextField from '../common/form/textField';
import CheckBoxField from '../common/form/checkBoxField';
import DropdownInfo from '../common/form/dropdownInfo';
import {useDispatch} from 'react-redux';
import {signUp} from '../../store/usersSlice';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        name: '',
        password: '',
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
        console.log('data', data);
        dispatch(signUp(data));
        navigate(-1);
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
                        <TextField
                            label='Электронная почта'
                            type='email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            error={errors.email}
                        />
                        <TextField
                            label='Имя'
                            type='name'
                            name='name'
                            onChange={handleChange}
                            value={data.name}
                            error={errors.name}
                        />
                        <TextField
                            label='Пароль'
                            type='password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            error={errors.password}
                        />
                        <CheckBoxField
                            value={data.licence}
                            onChange={handleChange}
                            name='licence'
                            error={errors.licence}
                        >
                            Подтвердить лицензионное соглашение
                            <DropdownInfo text='Лицензионное соглашение' />
                        </CheckBoxField>
                        <button
                            className='btn btn-primary card'
                            disabled={!isValid}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;
