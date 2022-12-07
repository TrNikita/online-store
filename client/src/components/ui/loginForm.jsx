import React, {useState} from 'react';
import {useParams} from 'react-router-dom';

const LoginForm = () => {
    const {type} = useParams();

    const [formType, setFormType] = useState(
        type === 'register' ? type : 'login',
    );

    console.log('formType', formType);

    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === 'register' ? 'login' : 'register',
        );
    };

    return (
        <div className='hero'>
            <div className='hero-content flex-col lg:flex-row-reverse'>
                <div className='text-center lg:text-left'>
                    <h1 className='text-5xl font-bold'>Войти</h1>
                </div>
                <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
                    <div className='card-body w-96 max-w-xl'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Email</span>
                            </label>
                            <input
                                type='email'
                                placeholder='email'
                                className='input input-bordered'
                            />
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Password</span>
                            </label>
                            <input
                                type='password'
                                placeholder='password'
                                className='input input-bordered'
                            />
                            <label className='label'>
                                <a
                                    className='label-text-alt link link-hover'
                                    onClick={toggleFormType}
                                >
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className='form-control mt-6'>
                            <button className='btn btn-primary'>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
