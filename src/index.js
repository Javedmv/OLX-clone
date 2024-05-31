import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { FirebaseContext } from './store/Context';
import firebase from './firebase/config'
import Context from './store/Context';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<FirebaseContext.Provider value={{firebase}}>
    <Context>
        <App />
    </Context>
</FirebaseContext.Provider>
);