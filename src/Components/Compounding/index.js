import React, { useState } from 'react'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import useStyles from '../../styles'

import Form from './Form'
import Chart from './Chart'
import Analysis from './Analysis'
import Help from './Help'


const useLocalStyles = makeStyles(theme => ({
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0"
    },
    grid: {
        maxWidth: "1600px",
        margin: "auto",
        [theme.breakpoints.up("md")]: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr",
            gridGap: "20px",
            //gridTemplateRows: "auto 1fr auto",
            alignItems: "start"
        },
        [theme.breakpoints.down("md")]: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "20px",
            alignItems: "start"
        },
        [theme.breakpoints.down("xs")]: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }
    },
    gridSection: {
        minWidth: "220px",
        margin: "8px auto",
        justifySelf: "center",
        alignSelf: "start",
        flexBasis: "100%"
    },
    gridSectionPlot: {
        minWidth: 300,
        width: "100%"
    }
}))

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
    const localClasses = useLocalStyles()
    const [state, setState] = useState(defaultState)

    console.log('render index')
    return (
        <div className={localClasses.pageContainer}>

            <Typography variant="h4" className={classes.pageTitle}>
                Investment and compounding
            </Typography>

            <div className={localClasses.grid}>

                <div className={localClasses.gridSection}>
                    <Typography variant="h6">
                        Scenario parameters
                    </Typography>
                    <Form state={state} setState={setState} classes={classes} />
                </div>

                <Analysis state={state} classes={localClasses} />

                <div className={localClasses.gridSectionPlot}>

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