import React, { useState, useEffect } from 'react';
import Category from './Category'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as categoriesActions from '../re-actions/categories';
import * as categoriesSelectors from '../re-selectors/categories';

const CategoriesList = props => {

  const [loaded, setLoaded] = useState(false);

  useEffect( () => {
      props.categoriesActions.loadCategories().then(()=>{
        setLoaded(true)
      })}, [])
  
  return (
    <div style={{
      display: 'grid',
      gridGap: '20px',
      gridTemplateColumns: 'repeat(auto-fill, 320px)',
      justifyContent: 'center',
    }}
    >
      {
        loaded &&
        props.categoriesKeys.map(id=>
          <Category key={id} id={id} />
        )
      }
    </div>
  )

}



const mapStateToProps = state => ({
  categoriesKeys: categoriesSelectors.getCategoriesKeysState(state),
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  categoriesActions: bindActionCreators(categoriesActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
