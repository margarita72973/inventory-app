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
		
		case 'ADD_INVENTORY_TO_CATEGORY':
		{
			let { categoryId, inventoryId } = action;
			if(state[categoryId].inventories.includes(inventoryId)) return state;
			state[categoryId].inventories = [ ...state[categoryId].inventories, inventoryId ]
			return {
				...state
			}
		}

		default:
			return state;
	}
}