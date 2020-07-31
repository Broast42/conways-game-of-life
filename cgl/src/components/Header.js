import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <h1>Conways Game of Life</h1>
            <nav>
                <NavLink exact to={'/'} activeStyle={{color: "rgb(166, 233, 172)"}}>
                    About
                </NavLink>
                <NavLink exact to={'/aui'} activeStyle={{color: "rgb(166, 233, 172)"}}>
                    Advanced Options
                </NavLink>
            </nav>
        </header>
    )
}

export default Header