import { createSelector } from 'reselect';


const getCategoriesKeys = state => {
    return !!state.categories ? Object.keys(state.categories) : []
}
const getCategory = (state, id) => {
    return !!state.categories && !!state.categories[id] ? state.categories[id] : {};
}


export const getCategoriesKeysState = createSelector([getCategoriesKeys], categoriesKeys => categoriesKeys);
export const getCategoryState = createSelector([getCategory], category => category);

