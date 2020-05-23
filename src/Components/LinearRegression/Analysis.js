import React from 'react'

import InfoCard from '../Common/InfoCard'


const DECIMALS = 4

const Analysis = ({ state, classes }) => {
    //console.log(state)
    //let equation = state.regression.equation?.withParameters
    return (
        <div className={classes.gridSection}>
            <InfoCard
                title={`${state.regressionType.slice(0, 1).toUpperCase() + state.regressionType.slice(1)} Regression`}
                info={[
                    //`Coefficients: ${state.regression.coefs?.map(c => c.toFixed(DECIMALS)) || ' '}`,
                    'Equation:',
                    `${state?.equation || ' '}`,
                    `${state.regression?.equation?.withCoefficients || ' '}`,
                    'Error analysis:',
                    `MAE = ${state.regression?.metrics?.meanAbsoluteError.toFixed(DECIMALS) || ' '}`,
                    `MSE = ${state.regression?.metrics?.meanSquaredError.toFixed(DECIMALS) || ' '}`,
                    `RMSE = ${state.regression?.metrics?.rootMeanSquaredError.toFixed(DECIMALS) || ' '}`,
                    `MAPE = ${state.regression?.metrics?.meanAbsolutePercentageError.toFixed(DECIMALS) || ' '}`,
                    `R2 = ${state.regression?.metrics?.r2score.toFixed(DECIMALS) || ' '}`,
                    `R2adj = ${state.regression?.metrics?.r2scoreAdjusted.toFixed(DECIMALS) || ' '}`,
                ]}
                className={classes.gridSection}
            maxWidth={300}
            />
            <InfoCard
                title="Prediction"
                info={[
                    `x = ${state.prediction.x?.toFixed(DECIMALS) || ' '}`,
                    `y = ${state.prediction.y?.toFixed(DECIMALS) || ' '}`,
                ]}
                className={classes.gridSection}
            //maxWidth={560}
            />

        </div>
    )
}

export default Analysis