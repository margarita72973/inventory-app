import React from 'react'
// import 'cropperjs/dist/cropper.css';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as categoriesActions from '../re-actions/categories';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import './Form.scss';

// import AddImage from './AddImage'


class AddCategoryForm extends React.Component {

    state = {
        name: '',
        description: '',
    }

    submitForm = e => {
        e.preventDefault();
        this.props.categoriesActions.addCategory(this.state).then(()=>{
            this.props.history.push('/categories');
        })
    }

    fillForm = value => e => {
        this.setState({[value]: e.target.value})
    }

    render(){
        return (
            <form className='categoryForm' onSubmit={this.submitForm}>
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



                {/* <AddImage {...this.props} /> */}
    
                <Button variant="contained" color="primary" className='button' component="button" type="submit">
                    {/* {this.props.action === 'add' ? 'Add' : 'Edit'} Course  */}
                    Add Category
                </Button> 
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    categoriesActions: bindActionCreators(categoriesActions, dispatch),
})

export default connect(null, mapDispatchToProps)(withRouter(AddCategoryForm));

