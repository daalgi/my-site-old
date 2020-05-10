import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import Header from './Header'


const drawerWidth = 158
const headerHeight = 64
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    title: {
        //width: "50%",
        maxWidth: "120px"
    },
    appBar: {
        width: "100%",
        zIndex: theme.zIndex.drawer + 1,
        height: headerHeight
    },
    menuHorizontal: {
        marginLeft: "150px"
    },
    appBarLink: {
        padding: theme.spacing(1, 1, 1, 1),
        //paddingLeft: `calc(2em + ${theme.spacing(4)}px)`,
        //width: '100%',
    },
    content: props => ({
        flexGrow: 1,
        /*transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),*/
        //marginLeft: theme.spacing(1),
        //width: "100%"
    }),
    toolbar: theme.mixins.toolbar,
}))

const Layout = props => {
    const { children } = props
    const classes = useStyles()

    return (
        <Grid container direction="column" justify="center">
            <CssBaseline />
            <Grid item>
                <Header classes={classes} />
            </Grid>
            <Grid item container direction="column">
                {children}
            </Grid>
        </Grid>

    )
}

export default Layout


/*

<div className={classes.root}>
            <CssBaseline />
            <div className={classes.grow}>
                <Header classes={classes} />
            </div>
            <div
            //display="flex"
            //justifyContent="center"

            className={classes.content}
            //justifyContent="center" m={1} p={1} className={classes.content}
            >
                <div className={classes.toolbar} />
                {children}
            </div>
        </div>



*/