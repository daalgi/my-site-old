import React, { useEffect } from 'react'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import CustomTextField from '../Common/CustomTextField'

import { normalDistribution, evalScenario, runCalculations } from './logic'


const defaultValues = {
    initialInvestment: 40000,
    monthlyDeposits: 1500,
    yearsToRetire: 16,
    monthlyWithdrawals: 2000,
    lastYear: 60,
    roiMean: 5,
    roiStsdv: 8
}

const Form = ({ state, setState, classes }) => {

    useEffect(() => {
        // Use the form initial values to do the first calculation
        let random = {}
        for (const key in defaultValues) {
            random[key] = parseFloat(defaultValues[key])
        }
        random.roiMean /= 100
        random.roiStsdv /= 100
        let constant = { ...random, roiStsdv: 0 }
        handleCalculations(constant, random)
    }, [])

    const handleChange = e => {
        const elements = e.currentTarget.elements
        let random = {}
        for (const element of elements) {
            random[element.name] = parseFloat(element.value)
        }
        random.roiMean /= 100
        random.roiStsdv /= 100
        let constant = { ...random, roiStsdv: 0 }
        handleCalculations(constant, random)
    }

    const handleSubmit = e => {
        //console.log(e.target)
        e.preventDefault()
        handleChange(e)
    }

    const handleCalculations = (constant, random) =>{
        let res = runCalculations(constant, random)
        //console.log(res)
        setState(res)
    }
        


    console.log('render form')
    return (
        <form onFocus={handleChange} onSubmit={handleSubmit}>
            <CustomTextField
                label="Years to retirement"
                name="yearsToRetire"
                defaultValue={defaultValues.yearsToRetire}
                className={classes.formItem}
            />
            <CustomTextField
                label="Initial investment"
                name="initialInvestment"
                defaultValue={defaultValues.initialInvestment}
                className={classes.formItem}
            />
            <CustomTextField
                label="Deposit/month"
                name="monthlyDeposits"
                defaultValue={defaultValues.monthlyDeposits}
                className={classes.formItem}
            />
            <CustomTextField
                label="Withdrawals/month (retirement)"
                name="monthlyWithdrawals"
                defaultValue={defaultValues.monthlyWithdrawals}
                className={classes.formItem}
            />
            <CustomTextField
                label="Last year"
                name="lastYear"
                defaultValue={defaultValues.lastYear}
                className={classes.formItem}
            />

            <Typography variant="subtitle2">
                Expected annual returns (normal distribution)
                    </Typography>
            <CustomTextField
                label="Mean [%]"
                name="roiMean"
                defaultValue={defaultValues.roiMean}
                className={classes.formItem}
            />
            <CustomTextField
                label="Standard deviation [%]"
                name="roiStsdv"
                defaultValue={defaultValues.roiStsdv}
                className={classes.formItem}
            />

            <Button className={classes.formItem}
                type="submit" variant="contained" name="btn1">
                Run experiment
            </Button>

        </form>
    )
}

export default Form