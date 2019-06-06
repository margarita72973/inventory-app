import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


import * as drawerActions from '../re-actions/drawer';

const styles = theme => ({
	root: {
		width: '100%',
		marginBottom: '24px',
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing(9),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		paddingTop: theme.spacing(),
		paddingRight: theme.spacing(),
		paddingBottom: theme.spacing(),
		paddingLeft: theme.spacing(10),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200,
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	navButton: {
		color: 'inherit'
	},
});

class NavBar extends React.Component {
	state = {
		anchorEl: null,
		mobileMoreAnchorEl: null,
	};

	handleProfileMenuOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleMenuClose = () => {
		this.setState({ anchorEl: null });
		this.handleMobileMenuClose();
	};

	handleMobileMenuOpen = event => {
		this.setState({ mobileMoreAnchorEl: event.currentTarget });
	};

	handleMobileMenuClose = () => {
		this.setState({ mobileMoreAnchorEl: null });
	};

	toggleDrawer = open => e => {
		this.props.drawerActions.toggleDrawer(open);
	}

	render() {
		const { anchorEl, mobileMoreAnchorEl } = this.state;
		const { classes, user } = this.props;
		const isMenuOpen = Boolean(anchorEl);
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

		const renderMenu = (
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMenuOpen}
				onClose={this.handleMenuClose}
			>
				<MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
			</Menu>
		);

		const renderMobileMenu = (
			<Menu
				anchorEl={mobileMoreAnchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMobileMenuOpen}
				onClose={this.handleMenuClose}
			>
				<MenuItem>
					<IconButton className={classes.navButton} color="inherit">
						{!!user && !!user.photoURL ? <Avatar src={user.photoURL} /> : <AccountCircle />}
					</IconButton>
					<p>Profile</p>
				</MenuItem>
				<MenuItem component={Link} to={{ pathname: `/categories/add`, 
									state: { modal: true } }}>
					<IconButton className={classes.navButton} color="inherit">
						<NoteAddIcon />
					</IconButton>
					<p>Add Category</p>
				</MenuItem>
				<MenuItem component={Link} to={{ pathname: `/inventories/add`, 
									state: { modal: true } }}>
					<IconButton className={classes.navButton} color="inherit">
						<NoteAddIcon />
					</IconButton>
					<p>Add Inventory</p>
				</MenuItem>
			</Menu>
		);

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton className={classes.menuButton} onClick={this.toggleDrawer(true)} color="inherit" aria-label="Open drawer">
							<MenuIcon />
						</IconButton>
						<Typography className={classes.title} variant="h6" color="inherit" noWrap>
							Material-UI
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
							/>
						</div>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<Tooltip title="Add Inventory">
								<IconButton component={Link} to={{ pathname: `/inventories/add`, 
									state: { modal: true, title: 'Inventory' } }} className={classes.navButton}>
									<NoteAddIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Add Category">
								<IconButton component={Link} to={{ pathname: `/categories/add`, 
									state: { modal: true, title: 'Category' } }} className={classes.navButton}>
									<NoteAddIcon />
								</IconButton>
							</Tooltip>
							<IconButton
								aria-owns={isMenuOpen ? 'material-appbar' : undefined}
								aria-haspopup="true"
								onClick={this.handleProfileMenuOpen}
								color="inherit"
							>
								{!!user && !!user.photoURL ? <Avatar src={user.photoURL} /> : <AccountCircle />}
							</IconButton>
						</div>
						<div className={classes.sectionMobile}>
							<IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
								<MoreIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMenu}
				{renderMobileMenu}
			</div>
		);
	}
}

NavBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	user: state.user
})
const mapDispatchToProps = dispatch => ({
    drawerActions: bindActionCreators(drawerActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar));
