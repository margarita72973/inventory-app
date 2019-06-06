const firebase = window.firebase;
const db = firebase.firestore();


export const addCategory = categoryData => {
    return dispatch => {
        const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
        categoryData = {...categoryData, timestamp};
        const categoryRef = db.collection('categories').doc();
        return categoryRef.set(categoryData).then(()=>{
            dispatch({type: 'ADD_CATEGORY', categoryId: categoryRef.id, categoryData});
        })
    }
    
}

export const loadCategories = () => {
    return dispatch => {
        const categories = {};
        return db.collection('categories').get().then( s => {
            s.forEach( doc => {
                categories[doc.id] = doc.data();
            } )
        }).then(()=>dispatch({type: 'LOAD_CATEGORIES', categories}));
    }
}