import React from 'react';
import routes from './routes/routes';
import {useRoutes} from 'react-router-dom';
import NavBar from './components/ui/navBar';
import AppLoader from './components/ui/HOC/appLoader';

function App() {
    const elements = useRoutes(routes);
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
