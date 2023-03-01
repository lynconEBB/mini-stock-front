import React, { Suspense, lazy } from 'react'

import { BrowserRouter, Route, Routes as RoutesSwitch } from 'react-router-dom'

import Login from './pages/Login'
import Products from './pages/Products'
import Suppliers from "./pages/Suppliers";
import Customers from "./pages/Customers"
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';

const Routes = () => {
    return (
        <BrowserRouter>
                <RoutesSwitch>
                    <Route path="/">
                        <Route index element={<Login/>}/>
                        <Route path="products" element={<Products/>}/>
                        <Route path="suppliers" element={<Suppliers/>}/>
                        <Route path="customers" element={<Customers/>}/>
                        <Route path="sales" element={<Sales/>}/>
                        <Route path="purchases" element={<Purchases/>}/>
                    </Route>
                    <Route path="*" element={<p>404 Not Found</p>}/>
                </RoutesSwitch>
        </BrowserRouter>
    )
}

export default Routes;