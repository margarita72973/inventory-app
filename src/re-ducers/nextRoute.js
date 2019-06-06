import initialState from './initialState';


export default function nextRouteReducer(state = initialState.nextRoute, action) {
	switch(action.type) {
		case 'SET_NEXT_ROUTE': 
			return action.route;
		case 'CLEAR': 
			return '';

		default:
			return state;
	}
}