import React from 'react'
// import 'cropperjs/dist/cropper.css';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as categoriesActions from '../re-actions/categories';
import * as nextRouteActions from '../re-actions/nextRoute';
import * as formsActions from '../re-actions/forms';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import './Form.scss';

import AddImage from './AddImage'


class AddCategoryForm extends React.Component {

    submitForm = e => {
        e.preventDefault();
        const { addCategoryForm } = this.props.forms;
        this.props.categoriesActions.addCategory(addCategoryForm).then(categoryId=>{
            this.props.formsActions.clearForm('addCategoryForm');
            if(!this.props.nextRoute) {
                this.props.history.goBack();
            } else {
                let nextRoute = this.props.nextRoute;
                if(nextRoute==='/inventories/add') {
                    this.props.formsActions.fillForm({form: 'addInventoryForm', prop:'categoryId', value: categoryId})
                }
                this.props.nextRouteActions.clear();
                this.props.history.push(nextRoute);
            }
        })
    }

    fillForm = prop => e => {
        this.props.formsActions.fillForm({form: 'addCategoryForm', prop, value: e.target.value})
    }

    onImageChange = image => {
        this.props.formsActions.fillForm({form: 'addCategoryForm', prop: 'image', value: image})
    }

    render(){
        const { name, description } = this.props.forms.addCategoryForm;
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

                <AddImage onImageChange={this.onImageChange} />
    
                <Button variant="contained" color="primary" className='button' component="button" type="submit">
                    Add Category
                </Button> 
            </form>
        )
    }
}

const mapStateToProps = state => ({
    nextRoute: state.nextRoute,
    forms: state.forms
})

const mapDispatchToProps = dispatch => ({
    categoriesActions: bindActionCreators(categoriesActions, dispatch),
    nextRouteActions: bindActionCreators(nextRouteActions, dispatch),
    formsActions: bindActionCreators(formsActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddCategoryForm));

