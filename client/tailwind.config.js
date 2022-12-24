module.exports = {
    content: ['./src/**/*.{html,js,jsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            'dark',
            'winter',
        ],
        styled: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: '',
        darkTheme: 'dark',
    },
};
