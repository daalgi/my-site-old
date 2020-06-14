import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'


const InfoCard = ({
    title,
    info = [],
    className = null,
    //maxWidth = null
}) =>
    <Card className={className} >

        <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
                {title}
            </Typography>
            {info.map((item, index) =>
                typeof item === "string"
                    ? <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        key={index}
                    >
                        {item}
                    </Typography>
                    : <Typography {...item} key={index}>
                        {item.text}
                    </Typography>
            )}
        </CardContent>
    </Card>

export default InfoCard