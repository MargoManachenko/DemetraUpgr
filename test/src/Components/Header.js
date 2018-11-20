import React from 'react';
import {Link} from 'react-router-dom';
import Auth from '../Modules/Auth';

class Header extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const activeClass = (route) => { return window.location.pathname === route ? "active" : null };
        if(Auth.isUserAuthenticated()){
            return (
                <header>
                    <ul className="header-menu">
                        <li className={activeClass("/")}><Link to="/home">Home</Link></li>
                        <li className={activeClass("/signOut")}><Link to="/signOut">Sign Out</Link></li>
                    </ul>
                </header>
            )
        }
        return (
            <header>
                <ul className="header-menu">
                    <li className={activeClass("/")}><Link to="/">Home</Link></li>
                    <li className={activeClass("/signIn")}><Link to="/signIn">Sign In</Link></li>
                    <li className={activeClass("/signUp")}><Link to="/signUp">Sign Up</Link></li>
                </ul>
            </header>
        )

    }
}

export default Header;