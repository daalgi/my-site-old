import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header'


const Layout = ({ children }) =>
    <>
        <CssBaseline />
        <Header />
        {children}
    </>

export default Layout