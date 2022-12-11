import React from 'react';
import {Link, Outlet} from 'react-router-dom';

const HomePage = () => {
    return (
        <>
            <div>
                <div className='hero min-h-screen'>
                    <div className='hero-content text-center'>
                        <div className='max-w-md'>
                            <h1 className='text-5xl font-bold'>Привет!</h1>
                            <p className='py-6'>
                                Provident cupiditate voluptatem et in. Quaerat
                                fugiat ut assumenda excepturi exercitationem
                                quasi. In deleniti eaque aut repudiandae et a id
                                nisi.
                            </p>
                            <Link to='/products' className='btn btn-active'>
                                Все товары
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default HomePage;
