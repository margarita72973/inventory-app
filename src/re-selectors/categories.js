import { createSelector } from 'reselect';


const getCategoriesKeys = state => {
    return !!state.categories ? Object.keys(state.categories) : []
}
const getCategory = (state, id) => {
    return !!state.categories && !!state.categories[id] ? state.categories[id] : null;
}

// const getBlock = (state, pageId, blockId) => {
//     return state.pages 
//             && !!state.pages[pageId] 
//             && state.pages[pageId].blocks 
//             && state.pages[pageId].blocks[blockId];
// }

// const getSortedBlocks = blocks => {
//     if(!Object.keys(blocks).length) return [];
//     return Object.keys(blocks).sort((blockId1, blockId2) => blocks[blockId1].sort - blocks[blockId2].sort)
// }

// const getBlocksSavedToDB = blocks => {
//     if(!Object.keys(blocks).length) return {};
//     return Object.keys(blocks)
//             .filter(blockId=>blocks[blockId].hasOwnProperty('created'))
//             .reduce((blcks,blId)=> {
//                 blcks[blId] = blocks[blId];
//                 return blcks;
//             }, {})
// }





export const getCategoriesKeysState = createSelector([getCategoriesKeys], categoriesKeys => categoriesKeys);
export const getCategoryState = createSelector([getCategory], category => category);

// export const getBlockState = createSelector([getBlock], block=>block);

// export const getSortedBlocksState = createSelector([getSortedBlocks], sortedBlocks => sortedBlocks)

// export const getBlocksSavedToDBState = createSelector([getBlocksSavedToDB], savedBlocks => savedBlocks)
