import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Drawer from './Drawer/Drawer';
import Login from './Login/Login';
import * as userActions from './re-actions/user';
import StorageLocationsList from './StorageLocations/StorageLocationsList';
import StorageLocation from './StorageLocations/StorageLocation';
import InventoriesList from './Inventories/InventoriesList';
import Inventory from './Inventories/Inventory';
import CategoriesList from './Categories/CategoriesList';
import Category from './Categories/Category';
import AddStorageLocation from './Forms/AddStorageLocation';
import AddCategoryForm from './Forms/AddCategoryForm';
import AddInventory from './Forms/AddInventory';

// import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';

import './App.css';

let firebase = window.firebase;

const styles = {
	paperScrollPaper: {
		minHeight: `calc(100vh - 24px)`,
	}
}


const ModalVideo = ({classes, fullScreen, onClose, open}) => (
	<Dialog
		classes={{
			paperScrollPaper: classes.paperScrollPaper
		}}
		maxWidth={"lg"}
		fullWidth
		fullScreen={fullScreen}
		open={open}
		onClose={onClose}
		aria-labelledby="responsive-dialog-title"
		>
		<DialogTitle id="responsive-dialog-title">{"Add Category"}</DialogTitle>
		<DialogContent>
			{open && (
					<Switch>
							<Route path={`/categories/add`} component={AddCategoryForm} />
					</Switch>
					)
			}
			{/* <DialogContentText> TEXT. </DialogContentText> */}
		</DialogContent>
		<DialogActions>
			{/* <Button onClick={this.handleClose} color="primary"> Disagree </Button> */}
			<Button onClick={onClose} color="primary" autoFocus> Close </Button>
		</DialogActions>
	</Dialog>
)

class App extends Component {

	previousLocation = this.props.location;


	componentDidMount(){
		firebase.auth().onAuthStateChanged( user=>{
			this.props.userActions.setLoggedInUser(user);
			if(user) {
				console.log("You are logged in", user, user.uid);
				// if(this.props.location.pathname==="/") this.props.history.push('/people')
			} else {
				console.log("You are NOT logged in");
				// this.props.history.push('/login');
			}
	})
}

UNSAFE_componentWillUpdate(nextProps) {
	// set previousLocation if props.location is not modal
	if ( nextProps.history.action !== "POP" && (!this.props.location.state || !this.props.location.state.modal) ) {
			this.previousLocation = this.props.location;
	}
}

handleClose = (e) => {
	e.stopPropagation();
	this.props.history.goBack();
}

	render(){
		const { children, user } = this.props
		const { location, classes } = this.props;

		const { fullScreen } = this.props;

		const isModal = !!( location.state && location.state.modal && this.previousLocation !== location ); // not initial render
		return (
			<div className="App">
				<NavBar />
				<Drawer />
				{/* {(!!user && !!user.uid) 
						? children 
						: user !== 'unknown' &&
						<div style={{textAlign: 'center'}}> 
								{/* <Message message="You need to login to start using an app" /> */}
								{/* <Login {...this.props} /> */}
						{/* </div> */}
				{/* // }	*/}
			{/* */} 
				<Switch location={isModal ? this.previousLocation : location}>
					<Route path='/locations/add' component={AddStorageLocation} />
					<Route path='/locations/:key' component={StorageLocation} />
					<Route path='/locations' component={StorageLocationsList} />

					<Route path='/categories/add' component={AddCategoryForm} />
					<Route path='/categories/:key' component={Category} />
					<Route path='/categories' component={CategoriesList} />

					<Route path='/login' component={Login} />

					<Route path='/inventories/add' component={AddInventory} />
					<Route path='/inventories/:key' component={Inventory} />
					<Route path='/inventories' component={InventoriesList} />
				</Switch>
			<ModalVideo open={isModal} classes={classes} fullScreen={fullScreen} onClose={this.handleClose} />

			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user,
})

const mapDispatchToProps = dispatch => ({
	userActions: bindActionCreators(userActions, dispatch),
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withMobileDialog()(withStyles(styles)(App))));
