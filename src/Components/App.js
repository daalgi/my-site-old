import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

//import AppContext from '../context'
import { barRoutes, internalRoutes } from './Routes'
import Layout from './Layout'
import { NotFound } from './Errors'


const App = () =>
    <HashRouter>
        {/*<AppContext.Provider value={getContext()}>*/}
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
        {/*</AppContext.Provider>*/}
    </HashRouter>

export default App