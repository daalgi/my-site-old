import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import MediaCard from './MediaCard'

//import useStyles from '../styles'


const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "center"
    },
    root: {
        maxWidth: 345,
        margin: 8
    },
    media: {
        height: 32,
        paddingTop: 8,//'56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        //backgroundColor: red[500],
    },
}))


const CardsLayout = ({ cards, CardComponent }) => {
    const classes = useStyles()

    return (
        <Grid container spacing={2} >
            {cards.map((card, index) =>
                <Grid item xs={12} sm={6} md={4} key={index}>
                    {
                        <CardComponent
                            {...card}
                            classes={classes}
                        />
                    }
                </Grid>
            )}
        </Grid>
    )
}

export default CardsLayout