import { createSelector } from 'reselect';


const getInventoriesKeys = state => {
    return !!state.inventories ? Object.keys(state.inventories) : []
}
const getInventory = (state, id) => {
    return !!state.inventories && !!state.inventories[id] ? state.inventories[id] : null;
}


export const getInventoriesKeysState = createSelector([getInventoriesKeys], inventoriesKeys => inventoriesKeys);
export const getInventoryState = createSelector([getInventory], inventory => inventory);

