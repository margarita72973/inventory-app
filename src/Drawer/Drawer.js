import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as drawerActions from '../re-actions/drawer';

import './Drawer.css';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
});

function TemporaryDrawer(props) {
    const classes = useStyles();
    const { drawer, drawerActions } = props;
    
    const toggleDrawer = open => e => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
			return;
		}

        drawerActions.toggleDrawer(open)
    }

	return (
        <Drawer open={drawer.open} onClose={toggleDrawer(false)}>
            <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <List>
                    <ListItem button className="DrawerItem" component={Link} to='/categories'>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary='Categories' />
                    </ListItem>
                    <ListItem button className="DrawerItem"  component={Link} to='locations'>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary='Locations' />
                    </ListItem>
                    <ListItem button className="DrawerItem"  component={Link} to='/inventories'>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary='Inventories' />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button className="DrawerItem"  component={Link} to=''>
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary='Profile' />
                    </ListItem>
                </List>
            </div>
        </Drawer>   
	);
}

const mapStateToProps = state => ({
    drawer: state.drawer
})

const mapDispatchToProps = dispatch => ({
    drawerActions: bindActionCreators(drawerActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer);
