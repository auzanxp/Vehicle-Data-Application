import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateData from '../pages/CreateData'
import Home from '../pages/Home'

const AppRoute = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/create' element={<CreateData />} />
                    <Route path='/detail/:Id' element={<CreateData />} />
                    <Route path='/edit/:Id' element={<CreateData/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoute
