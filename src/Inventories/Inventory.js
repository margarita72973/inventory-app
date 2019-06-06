import React from 'react'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as inventoriesActions from '../re-actions/inventories';
import * as inventoriesSelectors from '../re-selectors/inventories';



class Inventory extends React.Component{


    state = {
        anchorEl: null,
        edit: false,
    }

    handleOpen = e => {
        this.setState({ anchorEl: e.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleEdit = () => {
        this.setState({edit: true})
        this.handleClose()
    }

    handleDelete = () => {
        this.props.deleteVideo(this.props.docId);
        this.handleClose()
    }

    hideForm = () => {
        this.setState({edit: false})
    }


    render(){
        const { anchorEl } = this.state;
        const { name, description, imgUrl, cost, currency, category } = this.props.inventory;
        return(
            <>
            <ListItem role={undefined} button 
                component={Link}
                to='https://google.com'
                >
                <div style={{
                    width:120, height:90,
                    backgroundImage:`url(${imgUrl ? imgUrl : `https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80`})`,
                    backgroundSize: 'cover',
                    }}></div>
                <ListItemText primary={name} secondary={description || 'no description'} />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Comments" onClick={this.handleOpen}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                        >
                        <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
                        <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
                    </Menu>
                </ListItemSecondaryAction>
            </ListItem>
            {/* {this.state.edit && <Form docId={docId} hideForm={this.hideForm} />} */}
            </>
        )
    }
} 


const mapStateToProps = (state, { id }) => ({
	inventoriesKeys: inventoriesSelectors.getInventoriesKeysState(state),
	inventory: inventoriesSelectors.getInventoryState(state, id),
	inventories: state.inventories
})

const mapDispatchToProps = dispatch => ({
	inventoriesActions: bindActionCreators(inventoriesActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
