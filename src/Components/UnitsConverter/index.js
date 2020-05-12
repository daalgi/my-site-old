import React, { useState } from 'react'

import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import FileCopy from '@material-ui/icons/FileCopy'
import { makeStyles } from '@material-ui/core/styles'

import useStyles from '../../styles'
import { readInputConvertUnit, copyToClipBoard } from './calcs'
import Help from './Help'

const useLocalStyles = makeStyles(theme => ({
    form: {
        height: "56px",
        maxWidth: "800px",
        width: "100%",
    },
    roundedRectangle: {
        borderRadius: "10px",
        borderWidth: "2px",
        borderColor: theme.palette.primary.light,
    },
    row: {
        minWidth: "300px",
        maxWidth: "600px",
        width: "100%",
        fontFamily: "sans-serif",
        fontSize: "20px",
        color: "white",
        margin: "0px"
    },
    input: {
        background: "hsl(0, 0%, 24%)",
        margin: "auto",
        height: "100%",
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
            fontSize: "16px"
        }
    },
    listContainer: {
        minHeight: "600px",
        marginBottom: 32
    },
    listRow: {
        width: "100%",
        fontFamily: "sans-serif",
        height: "42px",
        alignContent: "center",
        fontSize: "20px",
        display: "grid",
        padding: 0,
        gridTemplateColumns: "2.5fr 1fr auto",
        "&:hover": {
            background: "hsl(90, 20%, 25%)"
        }
    }
}))

const UnitsConverter = () => {
    const [state, setState] = useState({})
    const classes = useStyles()
    const localClasses = useLocalStyles()

    const handleSubmit = e => {
        e.preventDefault()
        let input = e.currentTarget.elements.input.value
        let res = readInputConvertUnit(input)
        if (res && !res.error)
            setState(res)
    }

    return (
        <div className={classes.pageContainer}>

            <Typography variant="h4" className={classes.pageTitle}>
                Units Converter
            </Typography>

            <form
                onChange={handleSubmit}
                className={`${localClasses.row} ${localClasses.form}`}
            >
                <input
                    name="input"
                    background="hsl(0, 0%, 90%)"
                    variant="outlined"
                    placeholder="input magnitude and unit (i.e. 8 m mm)"
                    className={`${localClasses.row} ${localClasses.input} ${localClasses.roundedRectangle}`}
                />
            </form>

            <div
                className={`${localClasses.row} ${localClasses.listContainer}`}
            >
                {Object.keys(state).length > 0 &&
                    Object.entries(state).map(([key, value], index) =>
                        <div
                            key={index}
                            className={`${localClasses.row} ${localClasses.listRow} ${localClasses.roundedRectangle}`}
                        >
                            <p style={{ textAlign: "right", marginRight: 10 }}>{value}</p>
                            <p>{key}</p>
                            <IconButton aria-label="copy" onClick={_ => copyToClipBoard(value)}>
                                <FileCopy />
                            </IconButton>
                        </div>

                    )}
            </div>

            <Help classes={classes} />
        </div>
    )
}

export default UnitsConverter