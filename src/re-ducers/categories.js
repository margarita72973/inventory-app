import initialState from './initialState';

export default function categoriesReducer(state = initialState.categories, action) {
	switch(action.type) {
		case 'ADD_CATEGORY': 
		{
			const { categoryId, categoryData } = action;
			return { ...state, [categoryId]: categoryData }
		}

		case 'LOAD_CATEGORIES':
			return action.categories;

		default:
			return state;
	}
}