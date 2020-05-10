import React, { useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import AppContext from '../context'
import { barRoutes, internalRoutes } from './Routes'
import Layout from './Layout'
import { NotFound } from './Errors'


const App = () => {
    const [state, setState] = useState({
        //theme: 'dark',
        //sidebarOpen: true
    })

    const handleSidebarToggle = () => setState({ ...state, sidebarOpen: !state.sidebarOpen })
    const getContext = () => ({
        ...state,
        onSidebarToggle: handleSidebarToggle
    })

    return (
        <HashRouter>
            <AppContext.Provider value={getContext()}>
                <Layout>
                    <Switch>
                        {[...barRoutes, ...internalRoutes].map((item, index) =>
                            <Route
                                key={index}
                                path={item.path}
                                exact={item.exact}
                                children={<item.main />}
                            />
                        )}
                        <Route path='*' component={NotFound} />
                    </Switch>
                </Layout>
            </AppContext.Provider>
        </HashRouter>
    )
}

export default App