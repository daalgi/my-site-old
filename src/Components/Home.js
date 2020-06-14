import React from 'react'

import Typography from '@material-ui/core/Typography'

import useStyles from '../styles'


export default () => {
    const classes = useStyles()
    return (
        <main>
            <section className={classes.pageTitle}>
                <Typography variant="h4" >Home</Typography>
            </section>
        </main>

    )
}
