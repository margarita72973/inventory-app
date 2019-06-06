export const fillForm = ({form, prop, value}) => ({type: 'FILL_FORM', form, prop, value});

export const clearForm = form => ({type: 'CLEAR_FORM', form})