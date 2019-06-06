import React from 'react'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// import Form from './Form';
// import * as videosActions from '../../re-actions/videos';



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
        // const { docId, video } = this.props;
        const { anchorEl } = this.state;
        // const { youtubeInfo, publishDateTimestamp } = video;
        // let publishDate = new Date(publishDateTimestamp).toLocaleString()
        return(
            <>
            <ListItem role={undefined} button 
                component={Link}
                to='https://google.com'
                >
                <div style={{
                    width:120, height:90,
                    backgroundImage:`url(https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)`,
                    backgroundSize: 'cover',
                    }}></div>
                <ListItemText primary='Hello1' secondary='Hello2' />
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

// const mapStateToProps = (state, ownProps) => ({ video: state.videos[ownProps.docId] })
// const mapDispatchToProps = dispatch => ({
    // videosActions: bindActionCreators(videosActions, dispatch),
// })

export default connect(null, null)(Inventory)
// export default connect(mapStateToProps, mapDispatchToProps)(Inventory)