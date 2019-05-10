import initialState from './initialState';


export default function ajaxStatus(state= initialState.ajaxStatus, action) {
	if(action.type === 'BEGIN_AJAX_CALL') {
		// console.log(action.type)
		// console.info(`Ajax calls in progress: ${state+1}`);
		return state + 1;
	} else if (action.type === 'AJAX_CALL_ERROR' || action.type.substring(action.type.length-8) === '_SUCCESS') {
		// console.info(`Ajax calls in progress: ${state-1}`);
		// console.log(action.type)
		return state - 1;
	}
	return state;
}
