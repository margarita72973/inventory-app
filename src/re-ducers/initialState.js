export default {
    user: 'unknown',
    storageLocations: {},
    inventories: {},
    categories: {},
    ajaxStatus: 0,
    drawer: {
        open: false
    },
    nextRoute: '',
    forms: {
        'addInventoryForm': {
			name: '',
			description: '',
			image: {},
			cost: '',
			currency: '',
			categoryId: '',
        },
        'addCategoryForm': {
            name: '',
            description: '',
            image: {},
            inventoriesIds: [],
        }
    }
};
