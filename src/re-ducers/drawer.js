import initialState from './initialState'

export default (state = initialState.drawer, action) => {
    switch (action.type){

        case 'TOGGLE_DRAWER':
            return {...state, open: action.open}
        
        default:
            return state;
    }

}