import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { initMiddleware } from 'devise-axios';
import { injectGlobal, ThemeProvider } from 'styled-components';

initMiddleware()

const theme = {}

injectGlobal`
  @import url(https://fonts.googleapis.com/css?family=Arizonia);
  @import url(https://fonts.googleapis.com/css?family=Roboto);
  * {
    font-family: Roboto, sans-serif;
    margin: 0;
  }

  .name-animate { 
    font-family: 'Arizonia', cursive !important;
  }
`

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
