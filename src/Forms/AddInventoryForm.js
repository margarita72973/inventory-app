import React from 'react'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as inventoriesActions from '../re-actions/inventories';
import * as nextRouteActions from '../re-actions/nextRoute';
import * as formsActions from '../re-actions/forms';
import * as categoriesSelectors from '../re-selectors/categories';

import './Form.scss';

import AddImage from './AddImage';



const currencies = [
	{
		value: 'USD',
		label: '$',
	},
	{
		value: 'EUR',
		label: '€',
	},
	{
		value: 'BTC',
		label: '฿',
	},
	{
		value: 'JPY',
		label: '¥',
	},
];

const styles = theme => ({
	menu: {
		width: 200,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
});

class AddInventoryForm extends React.Component {

		submitForm = e => {
			e.preventDefault();
			const { addInventoryForm } = this.props.forms;
			this.props.inventoriesActions.addInventory(addInventoryForm).then(()=>{
					this.props.formsActions.clearForm('addInventoryForm');
					this.props.history.goBack();
			})
		}

		fillForm = prop => e => {
			if(!e.target.value && prop==='categoryId') {
				this.addNewCategory()
			}
			this.props.formsActions.fillForm({form: 'addInventoryForm', prop, value: e.target.value})

		}

		onImageChange = image => {
			this.props.formsActions.fillForm({form: 'addInventoryForm', prop: 'image', value: image})
		}

		addNewCategory = e => {
			this.props.nextRouteActions.setNextRoute(this.props.location.pathname);
			this.props.history.push('/categories/add');
		}

		render(){
			const { classes, categoriesKeys, categories, forms } = this.props;
			const { name, description, cost, currency, categoryId } = forms.addInventoryForm;

			return (
				<form className='inventoryForm' onSubmit={this.submitForm}>
						<TextField
							id="outlined-title-input"
							label="Name"
							className='textField'
							type="name"
							autoComplete="current-name"
							margin="normal"
							variant="outlined"
							value={name}
							onChange={this.fillForm('name')}
							required
						/>
						<TextField
							id="outlined-description-input"
							label="Description"
							className='textField'
							autoComplete="current-description"
							margin="normal"
							variant="outlined"
							multiline
							value={description}
							onChange={this.fillForm('description')}
						/>
						{/* <div className='costValue'> */}
							<TextField
								id="outlined-number"
								label="Cost"
								value={cost}
								onChange={this.fillForm('cost')}
								type="number"
								className='textField'
								InputLabelProps={{
									shrink: true,
								}}
								margin="normal"
								variant="outlined"
							/>
							<TextField
								id="outlined-select-currency"
								select
								label="Currency"
								className='textField'
								value={currency}
								onChange={this.fillForm('currency')}
								SelectProps={{
									MenuProps: {
									className: classes.menu,
									},
								}}
								helperText="Please select your currency"
								margin="normal"
								variant="outlined"
							>
								{currencies.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="outlined-select-category"
								select
								label="Category"
								className='textField'
								value={categoryId}
								onChange={this.fillForm('categoryId')}
								SelectProps={{
									MenuProps: {
									className: classes.menu,
									},
								}}
								helperText="Please select your category"
								margin="normal"
								variant="outlined"
							>
								<MenuItem value="">
									<em>Add New Category</em>
								</MenuItem>
								{categoriesKeys.map(id => (
									<MenuItem key={id} value={id}>
										{categories[id].name}
									</MenuItem>
								))}
							</TextField>
						{/* </div> */}


						<AddImage onImageChange={this.onImageChange} />

						<Button variant="contained" color="primary" className='button' component="button" type="submit">
								{/* {this.props.action === 'add' ? 'Add' : 'Edit'} Course	*/}
								Add Inventory
						</Button> 
				</form>
			)
		}
}

const mapStateToProps = state => ({
	categoriesKeys: categoriesSelectors.getCategoriesKeysState(state),
	categories: state.categories,
	forms: state.forms
})


const mapDispatchToProps = dispatch => ({
	inventoriesActions: bindActionCreators(inventoriesActions, dispatch),
	nextRouteActions: bindActionCreators(nextRouteActions, dispatch),
	formsActions: bindActionCreators(formsActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(AddInventoryForm)));

