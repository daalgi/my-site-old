import React from 'react'
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'


const MediaCard = ({
    title, clickable = true, url = "", imageUrl = "", description = "", labels = [], classes
}) =>
    <Card className={classes.cardsLayoutItem}>
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

            {labels.length && (
                <CardActions>
                    {labels.map((label, index) =>
                        <Chip label={label} key={index} variant="outlined"
                        />
                    )}
                </CardActions>
            )}

        </CardActionArea>
    </Card>

export default MediaCard