import React from 'react'
// import 'cropperjs/dist/cropper.css';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as inventoriesActions from '../re-actions/inventories';
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


// const useStyles = makeStyles(theme => ({
// 	menu: {
// 		width: 200,
// 	},
// }));

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

		state = {
			name: '',
			description: '',
			image: '',
			cost: '',
			currency: '',
			categoryId: '',
		}

		submitForm = e => {
				e.preventDefault();
				this.props.inventoriesActions.addInventory(this.state).then(()=>{
						this.props.history.goBack();
				})
		}

		fillForm = value => e => {
				this.setState({[value]: e.target.value})
		}

		onImageChange = image => {
				console.log('image', image)
				this.setState({image})
		}

		render(){
			const { classes, categoriesKeys, categories } = this.props;

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
							value={this.state.name}
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
							value={this.state.description}
							onChange={this.fillForm('description')}
						/>
						{/* <div className='costValue'> */}
							<TextField
								id="outlined-number"
								label="Cost"
								value={this.state.cost}
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
								value={this.state.currency}
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
								value={this.state.categoryId}
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
	// category: categoriesSelectors.getCategoryState(state, id),
	categories: state.categories
})


const mapDispatchToProps = dispatch => ({
	inventoriesActions: bindActionCreators(inventoriesActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(AddInventoryForm)));

