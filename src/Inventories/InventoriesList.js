import React, { useEffect, useState } from 'react';
import Inventory from './Inventory'
import List from '@material-ui/core/List';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as inventoriesActions from '../re-actions/inventories';
import * as inventoriesSelectors from '../re-selectors/inventories';
import * as categoriesSelectors from '../re-selectors/categories';


const InventoriesList = props => {

	return (
		<List>
			{
				props.inventoriesKeys && props.inventoriesKeys.length && props.inventoriesKeys.map(id=>
					<Inventory key={id} id={id} />
				)
			}
		</List>
	)

}



const mapStateToProps = (state, ownProps) => {
	const categoryId = ownProps.match.params.key || false;
	const inventoriesKeys = (
		!!categoryId
			? categoriesSelectors.getCategoryState(state, categoryId).inventories
			: inventoriesSelectors.getInventoriesKeysState(state)
	)
	return {
		inventoriesKeys,
		inventories: state.inventories
	}
}



const mapDispatchToProps = dispatch => ({
	inventoriesActions: bindActionCreators(inventoriesActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(InventoriesList);
