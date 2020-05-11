import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import useStyles from '../../styles'

import Form from './Form'
import Chart from './Chart'
import Analysis from './Analysis'
import Help from './Help'


const defaultState = {
    retirementStart: {
        year: 0,
        constant: 0,
        random: 0,
    },
    lastYear: {
        year: 0,
        deposited: 0,
        withdrawn: 0,
        constant: 0,
        random: 0,
        normalDistribution: { mean: 0, standardDeviation: 0 }
    },
    yearBankrupcy: {},
    probabilities: { noBankrupcy: 0 },
    plotData: [{ year: 1, constant: 0, random: 0 }]
}

const Compounding = () => {
    const classes = useStyles()
    const [state, setState] = useState(defaultState)

    console.log('render index')
    return (
        <div className={classes.pageContainer}>

            <Typography variant="h4" className={classes.pageTitle}>
                Investment and compounding
            </Typography>

            <div className={classes.grid}>

                <div className={classes.gridSection}>
                    <Typography variant="h6">
                        Scenario parameters
                    </Typography>
                    <Form state={state} setState={setState} classes={classes} />
                </div>

                <Analysis state={state} classes={classes} />

                <div className={classes.gridSectionPlot}>

                    <Chart
                        data={state.plotData} x="year" series={["constant", "random"]}
                        width="600" height="400"
                        classes={classes}
                    />
                </div>
            </div>

            <Help classes={classes} />
        </div>
    )
}

export default Compounding


/*

<Typography variant="h6" align="center">
                        Investment evolution
                    </Typography>

*/