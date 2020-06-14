import React from 'react'

import Home from './Home'
import About from './About'
import Portfolio from './Portfolio'
import Contact from './Contact'
import Compounding from './Compounding'
import UnitsConverter from './UnitsConverter'
import LinearRegression from './LinearRegression'


const barRoutes = [
    {
        label: "About", icon: "", path: "/about/", exact: true,
        main: _ => <About />
    }, {
        label: "Portfolio", icon: "", path: "/portfolio/", exact: true,
        main: _ => <Portfolio />
    }, {
        label: "Contact", icon: "", path: "/contact/", exact: true,
        main: _ => <Contact />
    }
]

const internalRoutes = [
    {
        label: "Home", icon: "", path: "/", exact: true,
        main: _ => <Home />,
        //selected: ({ path, id }) => path === id
    }, {
        label: "Compounding", icon: "", path: "/portfolio/compounding", exact: true,
        main: _ => <Compounding />
    }, {
        label: "Units Converter", icon: "", path: "/portfolio/units-converter", exact: true,
        main: _ => <UnitsConverter />
    }, {
        label: "Linear Regression", icon: "", path: "/portfolio/linear-regression", exact: true,
        main: _ => <LinearRegression />
    },
]

export {
    barRoutes,
    internalRoutes
}