import React from 'react';
import routes from './routes/routes';
import {useRoutes} from 'react-router-dom';
import NavBar from './components/ui/NavBar';

function App() {
    const elements = useRoutes(routes);
    // return <></>;
    return (
        <>
            <NavBar/>
            {elements}
            {/* <div className='App'> */}
            {/*     <header className='App-header'> */}
            {/*         <Counter /> */}
            {/*         <p> */}
            {/*             Edit <code>src/App.js</code> and save to reload. */}
            {/*         </p> */}
            {/*         <span> */}
            {/*             <span>Learn </span> */}
            {/*             <a */}
            {/*                 className='App-link' */}
            {/*                 href='src/app/App' */}
            {/*                 target='_blank' */}
            {/*                 rel='noopener noreferrer' */}
            {/*             > */}
            {/*                 React */}
            {/*             </a> */}
            {/*             <span>, </span> */}
            {/*             <a */}
            {/*                 className='App-link' */}
            {/*                 href='src/app/App' */}
            {/*                 target='_blank' */}
            {/*                 rel='noopener noreferrer' */}
            {/*             > */}
            {/*                 Redux */}
            {/*             </a> */}
            {/*             <span>, </span> */}
            {/*             <a */}
            {/*                 className='App-link' */}
            {/*                 href='src/app/App' */}
            {/*                 target='_blank' */}
            {/*                 rel='noopener noreferrer' */}
            {/*             > */}
            {/*                 Redux Toolkit */}
            {/*             </a> */}
            {/*             ,<span> and </span> */}
            {/*             <a */}
            {/*                 className='App-link' */}
            {/*                 href='src/app/App' */}
            {/*                 target='_blank' */}
            {/*                 rel='noopener noreferrer' */}
            {/*             > */}
            {/*                 React Redux */}
            {/*             </a> */}
            {/*         </span> */}
            {/*     </header> */}
            {/* </div> */}
        </>
    );
}

export default App;
