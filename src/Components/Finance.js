import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import MediaCard from './Common/MediaCard'
import CardsLayout from './Common/CardsLayout'
import Typography from '@material-ui/core/Typography'

const cards = [
    {
        title: "Compounding",
        url: "/finance/compounding",
        imageUrl: "https://investmindset.com/wp-content/uploads/2019/09/what-is-compound-interest-30000th00.jpg",
        description: "A simple compounding calculator"
    }, {
        title: "Compounding",
        url: "/finance/compounding",
        imageUrl: "https://investmindset.com/wp-content/uploads/2019/09/what-is-compound-interest-30000th00.jpg",
        description: "A simple compounding calculator"
    }, {
        title: "Compounding",
        url: "/finance/compounding",
        imageUrl: "https://investmindset.com/wp-content/uploads/2019/09/what-is-compound-interest-30000th00.jpg",
        description: "A simple compounding calculator"
    }, {
        title: "Compounding",
        url: "/finance/compounding",
        imageUrl: "https://investmindset.com/wp-content/uploads/2019/09/what-is-compound-interest-30000th00.jpg",
        description: "A simple compounding calculator"
    }, {
        title: "Compounding",
        url: "/finance/compounding",
        imageUrl: "https://investmindset.com/wp-content/uploads/2019/09/what-is-compound-interest-30000th00.jpg",
        description: "A simple compounding calculator"
    }
]

export default props =>
    <>
        <Typography variant="h4">Apps</Typography>
        <div>
            <CardsLayout
                cards={cards}
                CardComponent={MediaCard} />
        </div>
    </>