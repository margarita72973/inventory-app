import initialState from './initialState';

export default function itemsReducer(state = initialState.items, action) {
	switch(action.type) {

		default:
			return state;
	}
}