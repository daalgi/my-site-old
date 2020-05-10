import React from 'react'
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'


const MediaCard = ({
    title, url="", imageUrl="", description="", classes
}) =>
    <Card className={classes.root}>
        <CardActionArea component={Link} to={url}>
            {imageUrl &&
                <CardMedia
                    className={classes.media}
                    src={imageUrl}
                    title={title}
                />
            }

            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>

export default MediaCard