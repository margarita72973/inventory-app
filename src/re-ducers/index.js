import { combineReducers } from 'redux';

import user  from './user';
import storageLocations  from './storageLocations';
import inventories  from './inventories';
import categories  from './categories';
import drawer  from './drawer';
import ajaxStatus from './ajaxStatus';


const rootReducer = combineReducers({
    user,
    storageLocations,
    inventories,
    categories,
    drawer,
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