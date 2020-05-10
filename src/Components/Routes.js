import React from 'react'

import Home from './Home'
import Finance from './Finance'
import Compounding from './Compounding'


const barRoutes = [
    {
        label: "Finance", icon: "", path: "/finance", exact: true,
        main: _ => <Finance />
    }, 
]

const internalRoutes = [
    {
        label: "Home", icon: "", path: "/", exact: true,
        main: _ => <Home />,
        //selected: ({ path, id }) => path === id
    }, {
        label: "Compounding", icon: "", path: "/finance/compounding", exact: true,
        main: _ => <Compounding />
    },
]

export {
    barRoutes,
    internalRoutes
}