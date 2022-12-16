import React from 'react';
import routes from './routes/routes';
import {useRoutes} from 'react-router-dom';
import NavBar from './components/ui/NavBar/NavBar';
import AppLoader from './components/ui/HOC/AppLoader';

function App() {
    const elements = useRoutes(routes());
    return (
        <>
            <AppLoader>
                <NavBar />
                {elements}
            </AppLoader>
        </>
    );
}

export default App;
