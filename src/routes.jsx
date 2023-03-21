import React, { Suspense, lazy } from 'react'

import { BrowserRouter, Route, Routes as RoutesSwitch } from 'react-router-dom'

import Login from './pages/Login'
import Products from './pages/Products'
import Suppliers from "./pages/Suppliers";
import Customers from "./pages/Customers"
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';
import PrivateRoutes from './components/PrivateRoutes';
import Types from "./pages/Type/index.jsx";

const Routes = () => {
    return (
        <BrowserRouter>
            <RoutesSwitch>
                <Route element={<PrivateRoutes roles={["ADMIN"]}/>}>
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/types" element={<Types />}/>
                </Route>
                <Route element={<PrivateRoutes roles={["SELLER"]}/>}>
                    <Route path="/sales" element={<Sales />} />
                </Route>
                <Route element={<PrivateRoutes roles={["STOCK_MANAGER"]}/>}>
                    <Route path="/products" element={<Products />} />
                    <Route path="/purchases" element={<Purchases />} />
                </Route>
                <Route index element={<Login />} />
                <Route element={<Login />} path="/login" />
                <Route path="*" element={<p>404 Not Found</p>} />
            </RoutesSwitch>
        </BrowserRouter>
    )
}

export default Routes;