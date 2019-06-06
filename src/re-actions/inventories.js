const firebase = window.firebase;
const db = firebase.firestore();


export const addInventory = inventoryData => {
    return dispatch => {
        const storageRef = firebase.storage().ref();
        const inventoryRef = db.collection('inventories').doc();
        const inventoryId = inventoryRef.id
        console.log('inventoryData',inventoryData);

        return storageRef.child(`images/${inventoryRef.id}`).put(inventoryData.image).then(s=>{
            s.ref.getDownloadURL().then(imgUrl => {
                const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
                const { image, ...newInventoryData } = inventoryData;
                inventoryData = {...newInventoryData, timestamp, imgUrl};
                console.log(inventoryData.categoryId)
                const { categoryId } = inventoryData;
                const categoryRef = db.collection('categories').doc(categoryId);
                if(categoryId) {
                    let batch = db.batch();
                    batch.set(inventoryRef, inventoryData);
                    batch.update(categoryRef, {inventories: window.firebase.firestore.FieldValue.arrayUnion(inventoryId)});
                    batch.commit().then(()=>{
                        dispatch({type: 'ADD_INVENTORY', inventoryId, inventoryData});
                        dispatch({type: 'ADD_INVENTORY_TO_CATEGORY', categoryId, inventoryId })
                    });
                } else {
                    inventoryRef.set(inventoryData).then(()=>{
                        dispatch({type: 'ADD_INVENTORY', inventoryId, inventoryData});
                    })
                }
            });
        })
    }
}

export const loadInventories = () => {
    return dispatch => {
        const inventories = {};
        return db.collection('inventories').get().then( s => {
            s.forEach( doc => {
                inventories[doc.id] = doc.data();
            } )
        }).then(()=>dispatch({type: 'LOAD_INVENTORIES', inventories}));
    }
}