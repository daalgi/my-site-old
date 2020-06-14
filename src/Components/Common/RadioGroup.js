import React from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
    }
}))

const RadioGroup = ({ name, options, currentValue, onChange }) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            {options.map((item, index) =>
                <FormControlLabel key={index} value={item.value} label={item.label}
                    control={
                        <Radio name={name} checked={currentValue === item.value} onChange={onChange} />
                    }
                />

            )}
        </div>)

}



export default RadioGroup