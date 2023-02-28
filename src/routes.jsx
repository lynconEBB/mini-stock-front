import React, { Suspense, lazy } from 'react'

import { BrowserRouter, Route, Routes as RoutesSwitch } from 'react-router-dom'

import Login from './pages/Login'
import Products from './pages/Products'
import Suppliers from "./pages/Suppliers/index.jsx";

const Routes = () => {
    return (
        <BrowserRouter>
                <RoutesSwitch>
                    <Route path="/">
                        <Route index element={<Login/>}/>
                        <Route path="products" element={<Products/>}/>
                        <Route path="suppliers" element={<Suppliers/>}/>
                    </Route>
                    <Route path="*" element={<p>404 Not Found</p>}/>
                </RoutesSwitch>
        </BrowserRouter>
    )
}

export default Routes;