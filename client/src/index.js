import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app';
import Store from './store/store';

let root = document.createElement('div');
root.id = "root";
document.body.appendChild( root );
document.title = 'Orcish Revenge';

const jsx = (
    <Provider store={Store}>
        <App />
    </Provider>
);

// Now we can render our application into it
render( jsx, document.getElementById('root') );