import React, { useState } from 'react'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ExplicitIcon from '@material-ui/icons/Explicit'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'

import ReactDataGrid from 'react-data-grid'
import 'react-data-grid/dist/react-data-grid.css'

import useStyles from '../../styles'
import CustomTextField from '../Common/CustomTextField'
import RadioGroup from '../Common/RadioGroup'
import PasteIcon from '../Common/PasteIcon'
import { regression } from './calcs'
import Analysis from './Analysis'
import Chart from './Chart'


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
        display: "flex",
        flexWrap: "wrap"
    },
    gridSection: {
        width: "300px",
        margin: 8,
        [theme.breakpoints.down("md")]: {
            margin: "0 auto",
            marginBottom: 16
        },
    },
    gridSectionPlot: {
        //minWidth: 330,
        width: 500,
        height: 500,
        margin: 8,
        [theme.breakpoints.down("md")]: {
            width: 900,
            margin: "auto",
        },
        [theme.breakpoints.down("sm")]: {
            width: 600,
            margin: "auto",
        },
        [theme.breakpoints.down("xs")]: {
            width: 330,
            margin: "auto",
        },

    }
}))

const REGRESSION_CURVE_NUM_POINTS = 50

const REGRESSION_TYPES = [
    { label: "Linear", value: "linear", equation: "y = a0 + a1 * x" },
    { label: "Quadratic", value: "quadratic", equation: "y = a0 + a1 * x + a2 * x^2" },
    { label: "Cubic", value: "cubic", equation: "y = a0 + a1 * x + a2 * x^2 + a3 * x^3" },
    //{ label: "Logarithmi", value: "logarithmic" },
    //{ label: "Exponential", value: "exponential" },
]
const REGRESSION_EQUATIONS = Object.assign({},
    ...REGRESSION_TYPES.map(v => ({ [v.value]: v.equation }))
)

const isValidRow = row =>
    ![null, undefined].includes(row.x, row.y) && !isNaN(row.x) && !isNaN(row.y)


// Fixed maximum number of data points
const emptyGridData = Array(50).fill({}).map((_, i) =>
    ({ rowKey: i, point: i + 1, x: null, y: null })
)
const exampleGridData = Array(50).fill({}).map((_, i) =>
    i < 5
        ? ({ rowKey: i, point: i + 1, x: i, y: i * i + Math.random() })
        : ({ rowKey: i, point: i + 1, x: null, y: null })
)

const defaultState = {
    datapoints: emptyGridData,
    regressionType: "linear",
    equation: REGRESSION_EQUATIONS.linear,
    regression: {},
    prediction: { x: null, y: null }
}
const exampleState = {
    datapoints: exampleGridData,
    regressionType: "linear",
    equation: REGRESSION_EQUATIONS.linear,
    regression: {},
    prediction: { x: null, y: null }
}

const LinearRegression = props => {
    const classes = useStyles()
    const localClasses = useLocalStyles()
    const [state, setState] = useState(defaultState)

    const datapointsColumns = [
        {
            key: "point", name: "Point", editable: false,
            cellClass: classes.dataGridCell, headerCellClass: classes.dataGridHeader
        },
        {
            key: "x", name: "x", editable: true,
            cellClass: classes.dataGridCellEditable, headerCellClass: classes.dataGridHeader
        },
        {
            key: "y", name: "y", editable: true,
            cellClass: classes.dataGridCellEditable, headerCellClass: classes.dataGridHeader
        },
    ]

    const computeRegression = (type, data) => {
        //console.log('computeRegression', data)
        const filteredData = data.filter(row => isValidRow(row))

        let minPoints = 2
        if (type === "linear")
            minPoints = 2
        else if (type === "quadratic")
            minPoints = 3
        else if (type === "cubic")
            minPoints = 4
        let obj = filteredData.length >= minPoints
            ? regression({ type, data: filteredData })
            : null

        if (obj) {
            let dataX = filteredData.map(d => d.x)
            let xmin = Math.min(...dataX)
            let xmax = Math.max(...dataX)
            let curve = Array(REGRESSION_CURVE_NUM_POINTS).fill().map((_, i) => {
                let x = xmin + i / (REGRESSION_CURVE_NUM_POINTS - 1) * (xmax - xmin)
                let y = obj.predict(x)
                return { x, y }
            })
            obj['curve'] = curve
            //console.log(curve)
        }

        return obj
    }

    const handleExampleData = _ => setState({
        ...exampleState,
        regression: computeRegression(exampleState.regressionType, exampleState.datapoints)
    })

    const handlePasteData = e => {
        navigator.clipboard.readText().then(text => {
            let arr = text.split('\n').map(row => row.split(/\s+/).filter(Boolean))
            let data = [...state.datapoints].map((row, i) => {
                if (i < arr.length) {
                    return {
                        ...row,
                        x: !isNaN(arr[i][0]) ? arr[i][0] : null,
                        y: !isNaN(arr[i][1]) ? arr[i][1] : null,
                    }
                } else {
                    return row
                }

            })
            let regressionObj = computeRegression(state.regressionType, data)
            setState({ ...state, datapoints: data, regression: regressionObj })
        })
    }

    const handleDeleteData = _ => setState({ ...defaultState, regressionType: state.regressionType })

    const handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        // If the updated value is not a number, do not update
        let updatedKey = Object.keys(updated)[0]
        if (isNaN(updated[updatedKey]))
            return

        if (updated[updatedKey].trim() === "")
            updated[updatedKey] = null

        const rows = state.datapoints.slice()
        for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated }
        }
        //const notNullRows = rows.filter(row => row.x && row.y && !isNaN(row.x) && !isNaN(row.y))
        let updatedState = { ...state, datapoints: rows }
        let regressionObj = computeRegression(state.regressionType, rows)
        if (regressionObj)
            updatedState.regression = regressionObj
        setState(updatedState)

    }

    const handleRadioChange = ({ target: { value } }) => setState({
        ...state,
        regressionType: value,
        equation: REGRESSION_EQUATIONS[value],
        regression: computeRegression(value, state.datapoints)
    })

    const handlePrediction = e => {
        e.preventDefault()
        if (state.regression.predict) {
            let x = parseFloat(e.target.predictX.value)
            let y = state.regression.predict(x)
            let regressionObj = computeRegression(state.regressionType, [...state.datapoints, { x, y }])
            //console.log(x, y)
            setState({
                ...state,
                regression: regressionObj || state.regression,
                prediction: { x, y }
            })
        }
    }

    return (
        <main className={classes.pageContainer}>
            <section className={classes.pageTitle}>
                <Typography variant="h4" >Ordinary Least Squares Linear Regression</Typography>
            </section>
            <div className={localClasses.grid}>
                <div className={localClasses.gridSection}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6">Data points</Typography>
                        <div>
                            <Tooltip title="Example data">
                                <IconButton onClick={handleExampleData}>
                                    <ExplicitIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Paste data (from spreadsheet)">
                                <IconButton onClick={handlePasteData}>
                                    <PasteIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Remove data">
                                <IconButton onClick={handleDeleteData}>
                                    <DeleteSharpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>

                    <ReactDataGrid
                        rows={state.datapoints}
                        columns={datapointsColumns}
                        //enableCellCopyPaste
                        onRowsUpdate={handleGridRowsUpdated}
                    />

                    <br />
                    <Typography variant="h6" >Regression</Typography>
                    <RadioGroup
                        name="regressionType"
                        options={REGRESSION_TYPES}
                        currentValue={state.regressionType}
                        onChange={handleRadioChange}
                    />

                    <br />
                    <Typography variant="h6" >Prediction</Typography>
                    <form onSubmit={handlePrediction}>
                        <div style={{
                            display: "flex",
                            marginBottom: 16,
                            alignItems: "center"
                        }}>
                            <p style={{ marginLeft: 8, marginRight: 16 }}>x</p>
                            <CustomTextField
                                label="x" labelLocation="left" name="predictX"
                                size="small" variant="outlined"
                                style={{ width: "262px" }}
                            />
                        </div>

                        <Button type="submit" variant="contained" name="btn"
                            className={classes.formItem}
                        >
                            Predict
                        </Button>
                    </form>
                </div>

                <div className={localClasses.gridSection}>
                    <Analysis state={state} classes={localClasses} />
                </div>

                <div className={localClasses.gridSectionPlot}>
                    <Chart
                        data={
                            state.datapoints
                                .filter(row => isValidRow(row))
                                .map(v => ({ x: parseFloat(v.x), y: parseFloat(v.y) }))
                        }
                        curve={state.regression?.curve}
                        predictedPoint={state.prediction}
                    />
                </div>

            </div>
            {/*<p>{JSON.stringify(state.regression)}</p>*/}

            {/*<Help classes={classes} />*/}
        </main>
    )
}

export default LinearRegression