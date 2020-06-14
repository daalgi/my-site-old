import React from 'react'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import useStyles from '../styles'
import MediaCard from './Common/MediaCard'
import CardsLayout from './Common/CardsLayout'


const useLocalStyles = makeStyles(theme => ({
    cardsLayout: {
        maxWidth: "900px",
        margin: "0 auto 30px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridGap: "1rem",
        padding: 13      
        
    },
    cardsLayoutItem: {
        //margin: "0 8px",
        //maxWidth: 210
    }
}))

const cards = [
    {
        title: "Compounding",
        url: "/portfolio/compounding/",
        //imageUrl: "https://investmindset.com/wp-content/uploads/2019/09/what-is-compound-interest-30000th00.jpg",
        description: "A simple compounding calculator for long term investing",
        labels: ["investing", "mini-app"],
        //style: { minWidth: 300, maxWidth: 400 }

    }, {
        title: "Units Converter",
        url: "/portfolio/units-converter/",
        //imageUrl: "https://investmindset.com/wp-content/uploads/2019/09/what-is-compound-interest-30000th00.jpg",
        description: "Convenient units converter for engineers in a hurry",
        labels: ["engineering", "mini-app"]
    }, {
        title: "Linear Regression",
        url: "/portfolio/linear-regression/",
        //imageUrl: "https://investmindset.com/wp-content/uploads/2019/09/what-is-compound-interest-30000th00.jpg",
        description: "Ordynary least squares (OLS) linear regression",
        labels: ["engineering", "mini-app"]
    }, {
        title: "RC sectional analysis",
        url: "/portfolio/units-converter/",
        //imageUrl: "https://investmindset.com/wp-content/uploads/2019/09/what-is-compound-interest-30000th00.jpg",
        //description: "",
        labels: ["engineering", "mini-app"]
    }, {
        title: "Section stress integration",
        url: "/portfolio/units-converter/",
        //imageUrl: "https://investmindset.com/wp-content/uploads/2019/09/what-is-compound-interest-30000th00.jpg",
        //description: "",
        labels: ["fem", "engineering", "mini-app"]
    }, {
        title: "Linear Regression",
        url: "/portfolio/units-converter/",
        //imageUrl: "https://investmindset.com/wp-content/uploads/2019/09/what-is-compound-interest-30000th00.jpg",
        //description: "",
        labels: ["engineering", "mini-app"]
    }, {
        title: "RC sectional analysis",
        url: "/portfolio/units-converter/",
        //imageUrl: "https://investmindset.com/wp-content/uploads/2019/09/what-is-compound-interest-30000th00.jpg",
        //description: "",
        labels: ["engineering", "mini-app"]
    }, {
        title: "Section stress integration",
        url: "/portfolio/units-converter/",
        //imageUrl: "https://investmindset.com/wp-content/uploads/2019/09/what-is-compound-interest-30000th00.jpg",
        //description: "",
        labels: ["fem", "engineering", "mini-app"]
    }
]

export default props => {
    const classes = useStyles()
    const localClasses = useLocalStyles()

    return (
        <main>
            <section className={classes.pageTitle}>
                <Typography variant="h4" >Portfolio</Typography>
            </section>
            <CardsLayout
                cards={cards}
                CardComponent={MediaCard}
                classes={localClasses}
            />

        </main>
    )
}