import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {themes} from '../utils/themes';

const DarkModeContext = React.createContext();

export const useDarkMode = () => {
    return useContext(DarkModeContext);
};

const DarkModeProvider = ({children}) => {
    const getTheme = () => {
        const theme = localStorage?.getItem('theme');
        if (Object.values(themes).includes(theme)) return theme;

        const userMedia = window.matchMedia(
            '(prefers-color-scheme: light)',
        );
        if (userMedia.matches) return themes.light;

        return themes.dark;
    };

    const [theme, setTheme] = useState(getTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <DarkModeContext.Provider value={{theme, setTheme}}>
            {children}
        </DarkModeContext.Provider>
    );
};

DarkModeProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default DarkModeProvider;
