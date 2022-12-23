import React from 'react';
import {Link, Outlet} from 'react-router-dom';

const HomePage = () => {
    return (
        <>
            <div>
                <div className='hero'>
                    <div className='hero-content text-center'>
                        <div className='max-w-md'>
                            <div className='p-5'>
                                <div className='text-5xl font-bold'>
                                    Привет!
                                </div>
                                <div className='text-3xl'>
                                    <p>
                                        Это дипломный проект Трохова Никиты,
                                        выполненный в рамках курса
                                    </p>
                                    <p>
                                        Профессия Junior Frontend-разработчик
                                        Поток 4
                                    </p>
                                    <p>Result School</p>
                                </div>
                            </div>

                            <Link to='/products' className='btn btn-active'>
                                Перейти в каталог
                            </Link>
                            <div className='text-xl my-3'>
                                <p>Admin: admin@mail.ru</p>
                                <p>User: user@mail.ru</p>
                                <p>Password: 1234567A</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default HomePage;
