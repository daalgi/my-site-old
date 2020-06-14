import React from 'react'
import InfoCard from '../Common/InfoCard'
import { convertToK, convertToPercetage } from './logic'


const Analysis = ({ state, classes }) => {
    //console.log(state)
    return (
        <div className={classes.gridSection}>
            <InfoCard
                title="1000 random simulations"
                info={[
                    //`Mean: ${convertToK(state.lastYear.normalDistribution.mean)}`,
                    //`Standard deviation: ${convertToK(state.lastYear.normalDistribution.standardDeviation)}`,
                    `${convertToPercetage(state.probabilities.noBankrupcy)} of probability of still having money in ${state.lastYear.year}`,
                ]}
                className={classes.gridSection}
                //maxWidth={560}
            />
            <InfoCard
                title="Scenario Analysis"
                info={[
                    `Deposits: ${convertToK(state.lastYear.deposited)}`,
                    `Withdrawals: ${convertToK(state.lastYear.withdrawn)}`,
                    { variant: "subtitle1", text: "Constant returns hypothesis:" },
                    `- Retirement (${state.retirementStart.year}): 
                    ${convertToK(state.retirementStart.constant)}`,
                    `- Last year (${state.lastYear.year}): 
                    ${convertToK(state.lastYear.constant)}`,
                    state.yearBankrupcy.constant ? `- No money left in ${state.yearBankrupcy.constant}` : "",
                    { variant: "subtitle1", text: "One random simulation:" },
                    `- Retirement (${state.retirementStart.year}): 
                    ${convertToK(state.retirementStart.random)}`,
                    `- Last year (${state.lastYear.year}): 
                    ${convertToK(state.lastYear.random)}`,
                    state.yearBankrupcy.random ? `- No money left in ${state.yearBankrupcy.random}` : "",
                ]}
                className={classes.gridSection}
                //maxWidth={560}
            />

        </div>
    )
}

export default Analysis