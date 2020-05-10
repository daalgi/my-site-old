import React from 'react'
import InfoCard from '../Common/InfoCard'
import { convertToK } from './logic'


const Analysis = ({ state, classes }) =>
    <div className={classes.contentContainer}>
        <InfoCard
            title="Scenario Analysis"
            info={[
                `Deposits: ${convertToK(state.constant.deposited)}`,
                `Withdrawals: ${convertToK(state.constant.withdrawn)}`,
                `Invested at retirement (constant returns): ${convertToK(state.constant.lastYear)}`,
                `Invested in the last year (constant returns): ${convertToK(state.constant.lastYear)}`,
                `Invested at retirement (random simulation): ${convertToK(state.random.lastYear)}`,
                `Invested in the last year (random simulation): ${convertToK(state.random.lastYear)}`,
            ]}
            classes={classes}
            maxWidth={500}
        />

        <InfoCard
            title="Normal distribution (1000 random simulations)"
            info={[
                `Mean: ${convertToK(state.lastYearDistribution.mean)}`,
                `Standard deviation: ${convertToK(state.lastYearDistribution.standardDeviation)}`,
                `84.1% of probability of having at least 
                ${convertToK(state.lastYearDistribution.mean - state.lastYearDistribution.standardDeviation)}`,
            ]}
            classes={classes}
            maxWidth={560}
        />
    </div>

export default Analysis