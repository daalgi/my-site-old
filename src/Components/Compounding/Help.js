import React, { useEffect } from 'react'

import Typography from '@material-ui/core/Typography'


const Help = ({ classes }) =>
    <div className={classes.contentMaxWidth}>
        <Typography variant="h4" className={classes.pageSubtitle}>
            How does it work?
        </Typography>        
        <Typography variant="subtitle1" color="textSecondary" className={classes.paragraph}>
            This app allows you to evaluate your retirement plan.            
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" className={classes.paragraph}>
            Often these computations are made 
            under the assumption of a constant annual rate of return on your investments, 
            for instance somewhere between 7% and 9%. 
            However, the reality is quite different: 
            hardly any year the returns yield an actual 7%.
            For instance, annual returns of the S&P 500 look like
            1.38% (2015), -4.38% (2018) or 31.49% (2019).
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" className={classes.paragraph}>
            For this reason, a scenario where early years perform worse
            will have an important impact in our portfolio.
            Therefore, this calculator runs a set of 1000 simulations
            with random yearly returns and analyzes the outcomes 
            giving answer to the key question: 
            what's the probability of still having money the last year?
        </Typography>
    </div>

export default Help