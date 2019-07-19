import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import App from './components/app';
import Store from './store/store';

let root = document.createElement('div');
root.id = "root";
document.body.appendChild( root );
document.title = 'Orcish Revenge';

const jsx = (
  <Provider store={Store}>
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);

// Now we can render our application into it
render( jsx, document.getElementById('root') );