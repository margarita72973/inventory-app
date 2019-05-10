import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui//core/colors/blue';

import reducers from './_reducers';
import App from './App';
import ScrollToTop from './utils/ScrollToTop';

import PlacesList from './Places/PlacesList';
import Place from './Places/Place';
import ItemsList from './Items/ItemsList';
import Item from './Items/Item';
import AddPlace from './Forms/AddPlace';
import AddItem from './Forms/AddItem';
import Login from './Login/Login';
// import EditCourse from './components/Forms/EditCourse';
// import PlaylistsList from './components/Playlists/PlaylistsList';
// // import CoursesList from './components/Courses/CoursesList';
// import Course from './components/Courses/Course';
// import PlaylistContent from './components/Playlists/PlaylistContent';
// import FavoriteCourses from './components/Courses/FavoriteCourses';
// import SearchedCourses from './components/Courses/SearchedCourses';
// import AllCourses from './components/Courses/AllCourses';


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
                    <App>
                        <div className="AppContent">
                            <Switch>
                                <Route path='/login' component={Login} />
                                <Route path='/places' component={PlacesList} />
                                <Route path='/places/:key' component={Place} />
                                <Route path='/items' component={ItemsList} />
                                <Route path='/items/:key' component={Item} />
                                <Route path='/places/add' component={AddPlace} />
                                <Route path='/items/add' component={AddItem} />
                            </Switch>
                        </div>
                    </App>
                </MuiThemeProvider>
            </ScrollToTop>
        </Router>
    </Provider>
),document.getElementById('root'));