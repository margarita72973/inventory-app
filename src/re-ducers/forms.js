import initialState from './initialState'

export default (state = initialState.forms, action) => {
    switch (action.type){

        case 'FILL_FORM': 
        {
            const {form, prop, value} = action;
            state[form] = {
                ...state[form],
                [prop]: value
            }
            return {
                ...state
            }
        }

        case 'CLEAR_FORM': {
            const { form } = action;
            console.log('form', form, state[form])
            return {
                ...state,
                [form]: Object.keys(state[form]).reduce((clearedForm, value)=>{
                    console.log(typeof state[form][value])
                    if (Array.isArray(state[form][value])) {
                        clearedForm[value] = [];
                    } else if (typeof state[form][value] === 'object') {
                        clearedForm[value] = {};
                    } else {
                        clearedForm[value] = '';
                    }
                    return clearedForm;
                }, {})
            }
        }
        
        default:
            return state;
    }

}