import React from "react"
import { Link } from 'react-router-dom'
import { ReactComponent as Home } from '../assets/home.svg'
import { ReactComponent as FacebookLogo } from '../assets/facebookLogo.svg'


const Nav = (props) => {
    return (
        <nav className="border bg-white shadow-sm">
            <div className="mx-3">
                <Link to="/">
                    <div className="div-container logo-container"><FacebookLogo className="fb-logo-color"/></div>
                </Link>
            </div>
            <ul className="nav-ul">
                <li>
                    <Link to="/">
                        Home
                    </Link></li>
                <li>
                    <Link to="/login">
                        login
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <div className="div-container"><Home className="nav-icon" /></div>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav