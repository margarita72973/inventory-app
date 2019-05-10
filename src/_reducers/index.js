import { combineReducers } from 'redux';

import user  from './user';
import places  from './places';
import items  from './items';
import ajaxStatus from './ajaxStatus';


const rootReducer = combineReducers({
    user,
    places,
    items,
    ajaxStatus,
});


const inventorySystemReducer = (state, action) => {
    if(action.type === 'SET_LOGGED_IN_USER' && action.user === null) {
        state = undefined;
    }
    return rootReducer(state, action)
}

// export default rootReducer;
export default inventorySystemReducer;