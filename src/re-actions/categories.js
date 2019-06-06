const firebase = window.firebase;
const db = firebase.firestore();


export const addCategory = categoryData => {
    return dispatch => {
        const storageRef = firebase.storage().ref();
        const categoryRef = db.collection('categories').doc();
        console.log('categoryData',categoryData)
        return storageRef.child(`images/${categoryRef.id}`).put(categoryData.image).then(s=>{
            s.ref.getDownloadURL().then(imgUrl => {
                const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
                const { image, ...newCategoryData } = categoryData;
                categoryData = {...newCategoryData, timestamp, imgUrl};
                console.log('categoryData', categoryData)
                categoryRef.set(categoryData).then(()=>{
                    dispatch({type: 'ADD_CATEGORY', categoryId: categoryRef.id, categoryData});
                })
            });
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