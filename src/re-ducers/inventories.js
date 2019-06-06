import initialState from './initialState';

export default function inventoriesReducer(state = initialState.inventories, action) {
	switch(action.type) {
		case 'ADD_INVENTORY': 
		{
			const { inventoryId, inventoryData } = action;
			return { ...state, [inventoryId]: inventoryData }
		}

		case 'LOAD_INVENTORIES':
			return action.inventories;
		default:
			return state;
	}
}
