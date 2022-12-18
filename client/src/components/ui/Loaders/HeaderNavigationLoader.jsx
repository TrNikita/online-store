import React from 'react';

const HeaderNavigationLoader = () => {
    const arr = [
        'FooterFooter1',
        'FooterFooter2',
        'FooterFooter3',
        'FooterFooter4',
    ];

    return (
        <footer className='animate-pulse bg-neutral-content/25 flex flex-row justify-around px-24 py-2 font-bold italic'>
            {arr.map((i) => (
                <div
                    key={i}
                    className='badge badge-ghost text-transparent'
                >
                    {i}
                </div>
            ))}
        </footer>
    );
};

export default HeaderNavigationLoader;
