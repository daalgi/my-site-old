import React from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import { barRoutes } from '../Routes'

import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'


function HideOnScroll({ children }) {
    const trigger = useScrollTrigger();
    return (
        <Slide in={!trigger}>
            {children}
        </Slide>
    )
}

const Header = ({ classes }) =>
    <HideOnScroll>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Button size="large" component={Link} to="/" className={classes.title}>
                    My site
                </Button>

                <div className={classes.menuHorizontal}>

                    {barRoutes.map(({ label, path }, index) => (
                        <Button key={index} component={Link} to={path} className={classes.appBarLink}>
                            {label}
                        </Button>
                    ))}
                </div>
            </Toolbar>
        </AppBar>
    </HideOnScroll>

export default Header

