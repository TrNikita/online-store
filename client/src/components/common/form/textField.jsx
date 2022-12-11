import React, {useState} from 'react';
import PropTypes from 'prop-types';

const TextField = ({label, type, name, value, onChange, error}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value});
    };
    const getInputClasses = () => {
        return 'input input-bordered' + (error ? ' input-error' : '');
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div className='card flex-shrink-0 w-full max-w-sm bg-base-100'>
            <div className='card-body w-96 max-w-xl px-4 py-4'>
                <div className='form-control w-screen flex-row'>
                    <input
                        type={showPassword ? 'text' : type}
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        className={`${getInputClasses()} w-72`}
                        placeholder={label}
                    />
                    {type === 'password' && (
                        <button
                            className='btn btn-ghost'
                            type='button'
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? (
                                <svg
                                    className='h-8 w-8 text-black'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                >
                                    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                                    <circle cx='12' cy='12' r='3' />
                                </svg>
                            ) : (
                                <svg
                                    className='h-8 w-8 text-black'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                                    />
                                </svg>
                            )}
                        </button>
                    )}
                </div>
                {error && (
                    <div className='text-red-500 text-xs italic'>{error}</div>
                )}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: 'text',
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
};

export default TextField;
