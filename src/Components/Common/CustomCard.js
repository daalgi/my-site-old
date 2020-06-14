import React from 'react'
import { Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    card: {
        //height: "18vw",
        //width: "30vw",
        minHeight: "185px",
        minWidth: "300px",
        maxWidth: "400px",
        background: "hsl(0, 0%, 28%)",
        borderRadius: "16px",
        borderWidth: "0",
        //borderColor: "hsl(0, 0%, 32%)",
        margin: "8px",
        padding: "13px",
        transition: "all 0.5s",
        "&:hover": {
            //borderWidth: "88px",
            //borderColor: "hsl(90, 0%, 32%)",
            boxShadow: "4px 4px 0px 0px hsl(0, 0%, 90%)",
        }
    },
    chip: {
        display: "inline-block",
        //padding: "0 2px",
        //height: "25px",
        //minWidth: "48px",
        fontSize: "13px",
        lineHeight: "20px",
        //borderColor: "hsl(80, 20%, 30%)",
        background: "hsl(80, 20%, 35%)",
        padding: "0.3em 0.8em",
        margin: "0 0.3em 0.3em 0",
        borderRadius: "2em",
        //boxSizing: "border-box",
        textDecoration: "none",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 300,
        textAlign: "center",
        transition: "all 0.2s",
        /*"&:hover": {
            boxShadow: "0px 1px 0px 1px",
        }*/
    }
}))


const CustomCard = ({
    title, clickable = true, url = "", imageUrl = "", description = "", labels = [],
}) => {
    const classes = useStyles()

    return (
        <div className={classes.card}>
            <Typography variant="h5">{title}</Typography>
            {labels.map((label, index) =>
                <div key={index} className={classes.chip}>{label}</div>
            )}
        </div>

    )
}


export default CustomCard