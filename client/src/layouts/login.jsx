import React, {memo, useState} from 'react';
import {useParams} from 'react-router-dom';
import LoginForm from '../components/ui/loginForm';
import RegisterForm from '../components/ui/registerForm';

const Login = memo(() => {
    const {type} = useParams();
    const [formType, setFormType] = useState(
        type === 'register' ? type : 'login',
    );

    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === 'register' ? 'login' : 'register',
        );
    };

    return (
        <div>
            <div className='p-4 flex-1 justify-center'>
                {formType === 'register' ? <RegisterForm /> : <LoginForm />}

                <div className='hero-content max-w-full lg:flex-row-reverse p-2'>
                    <button
                        className='p-2 btn btn-outline hero card w-full max-w-sm shadow-2xl bg-base-100 italic
                        hover:transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300
                        '
                        onClick={toggleFormType}
                    >
                        {formType === 'register'
                            ? 'Есть аккаунт? Войти'
                            : 'Нет аккаунта? Зарегистрироваться'}
                    </button>
                </div>
            </div>
        </div>
    );
});

export default Login;
