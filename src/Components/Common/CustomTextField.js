import React from 'react'

import TextField from '@material-ui/core/TextField'



const CustomTextField = ({
    label, name, labelLocation = null, ...props
}) =>
    <div className={props.className}>
        <TextField
            label={!labelLocation && label}
            name={name}
            autoComplete="new-password"
            {...props}
        />
    </div>

export default CustomTextField