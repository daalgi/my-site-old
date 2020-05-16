import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import DehazeIcon from '@material-ui/icons/Dehaze'
/*import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'*/

import { barRoutes } from '../Routes'


const maxWidth = 1200
const color = {
    primary: {
        light: "hsl(0, 0%, 23%)",
        dark: "hsl(0, 0%, 20%)",
        darkest: "hsl(0, 0%, 17%)",
    },
    secondary: {
        light: "hsl(90, 50%, 40%)",
        dark: "hsl(90, 50%, 35%)",
        darkest: "hsl(90, 50%, 30%)"
    },
    text: {
        primary: "hsl(0, 0%, 88%)",
        secondary: "hsl(0, 0%, 78%)",
    }
}
const transition = "ease 800ms"
const useStyles = makeStyles(theme => ({
    navbar: {
        color: color.text.primary,
        background: color.primary.light,
        boxShadow: `0 0 0 3px ${color.primary.darkest}`,
    },
    navItems: {
        maxWidth: maxWidth,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "auto",
        fontSize: "18px",
        padding: "0 32px 0 32px",
        transition,
        [theme.breakpoints.down("sm")]: {
            padding: "0 16px 0 16px",
        },
        [theme.breakpoints.down("xs")]: {
            padding: "0 4px 0 4px",
            flexDirection: "column",
        }
    },
    navLogoContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
    },
    navLogoItem: {
        textDecoration: "none",
        marginLeft: 32,
        marginRight: "auto",
        padding: "9px 0 9px 0",
        flex: "0 0 200px",
        fontFamily: "sans-serif",
        fontSize: "30px",
        color: color.text.primary,
        background: color.primary.light,
        [theme.breakpoints.down("xs")]: {
            paddingLeft: 0,
            marginLeft: 16
        }
    },
    navToggleItem: {
        display: "none",
        transition,
        [theme.breakpoints.down("xs")]: {
            marginLeft: "auto",
            display: "flex",
        }
    },
    navHideItem: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        }        
    },
    navItem: {
        listStyleType: "none",
        textDecoration: "none",
        color: color.text.primary,
        background: color.primary.light,
        textAlign: "center",
        padding: 16,
        height: "100%",
        borderBottom: "3px solid transparent",
        "&:hover": {
            background: color.primary.dark,
            borderBottom: `3px solid ${color.secondary.light}`
        },
        [theme.breakpoints.down("xs")]: {
            width: "100%"
        }
    }
}))

/*function HideOnScroll({ children }) {
    const trigger = useScrollTrigger();
    return (
        <Slide in={!trigger}>
            {children}
        </Slide>
    )
}*/

const Header = () => {
    const classes = useStyles()
    const [toggle, setToggle] = useState(false)
    const { pathname } = useLocation()
    const isMobileSize = useMediaQuery(theme => theme.breakpoints.down("xs"))

    useEffect(() => setToggle(false), [isMobileSize, pathname])

    const handleToggle = _ => setToggle(!toggle)

    return (
        /*<HideOnScroll>*/
        <nav className={classes.navbar}>

            <nav className={classes.navItems}>

                <div className={classes.navLogoContainer}>
                    <Link to="/" className={classes.navLogoItem}>David A.G.</Link>
                    <IconButton
                        aria-label="toggle"
                        onClick={handleToggle}
                        className={classes.navToggleItem}
                    >
                        <DehazeIcon />
                    </IconButton>
                </div>

                {barRoutes.map(({ label, path }, index) => (
                    <Link
                        key={index}
                        to={path}
                        className={`${classes.navItem} ${!toggle ? classes.navHideItem : ''}`}
                    >
                        {label}
                    </Link>
                ))}
            </nav>

        </nav >
        /*</HideOnScroll>*/
    )
}

export default Header