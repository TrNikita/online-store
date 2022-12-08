import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import LoginForm from '../components/ui/loginForm';

const Login = () => {
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
                {formType === 'register' ? (
                    <>
                        <h3 className='mb-4'>Register</h3>
                        {/* <RegisterForm /> */}
                        <p>
                            Already have account?{' '}
                            <a role='button' onClick={toggleFormType}>
                                {' '}
                                Sign In
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <LoginForm />
                        <div className='hero-content lg:flex-row-reverse p-2'>
                            <div className='btn btn-outline hero card w-full max-w-sm shadow-2xl bg-base-100'>
                                <button
                                    className='p-2'
                                    onClick={toggleFormType}
                                >
                                    Зарегистрироваться
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
