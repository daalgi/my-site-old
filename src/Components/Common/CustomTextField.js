import React from 'react'

import TextField from '@material-ui/core/TextField'


const CustomTextField = ({ 
    label, name, ...props 
}) =>
    <div className={props.className}>
        <TextField
            label={label}
            name={name}
            autoComplete="new-password"
            {...props}
        />
    </div>

export default CustomTextField