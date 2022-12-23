import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './store/store';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import DarkModeProvider from './hooks/UseDarkMode';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <DarkModeProvider>
                    <App />
                </DarkModeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
