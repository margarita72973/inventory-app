import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui//core/colors/blue';

import reducers from './re-ducers';
import App from './App';
import ScrollToTop from './utils/ScrollToTop';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));


const theme = createMuiTheme({
    palette: {
        primary: blue,
      // secondary: green,
    },
    status: {
      // danger: 'orange',
    },
    typography: {
        useNextVariants: true
    }
    // breakpoints: {
    //   keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    //   values: [360, 768, 992, 1200, 1440],
    // },
  });

ReactDOM.render(
    (<Provider store={store}>
        <Router>
            <ScrollToTop>
                <MuiThemeProvider theme={theme}>
                    <Route component={App}/>
                </MuiThemeProvider>
            </ScrollToTop>
        </Router>
    </Provider>
),document.getElementById('root'));