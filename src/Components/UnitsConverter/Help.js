import React from 'react'

import Typography from '@material-ui/core/Typography'

import { UNITS } from './calcs'

const Help = ({ classes }) =>
    <div className={classes.contentMaxWidth}>
        <Typography variant="h4" className={classes.pageSubtitle}>
            How does it work?
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" className={classes.paragraph}>
            Example of valid inputs:
            <ul>
                <li>m2</li>
                <li>5 m/s</li>
                <li>ºC ºF</li>
                <li>8 ft m</li>
                <li>88 MPa to ksi</li>
                <li>45 deg in rad</li>
                <li>3.1+5/3*(1-0.7/2) kN</li>
                <li>3/2-5/1.5 m2 in ft2</li>
            </ul>
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" className={classes.paragraph}>
            Available quantities and units:
            <ul>
                {Object.keys(UNITS).map((quantity, q) =>
                    <li key={q}>{
                        `${quantity[0].toUpperCase() + quantity.substring(1)}:
                        ${Object.keys(UNITS[quantity]).map(unit => ` ${unit}`
                        )}.`
                    }</li>
                )}
            </ul>
        </Typography>
    </div>

export default Help