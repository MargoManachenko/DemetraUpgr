import React from 'react';
import {Link} from 'react-router-dom';
import Auth from '../Modules/Auth';

class Header extends React.Component {

    constructor(props) {
        super(props);

    }

    LogOut(e) {
        e.preventDefault();
        Auth.deauthenticateUser();
        window.location = "/";
    }


    render() {
        const activeClass = (route) => { return window.location.pathname === route ? "active" : null };
        if(Auth.isUserAuthenticated()){
            return (
                <header>
                    <ul className="header-menu">
                        <li className={activeClass("/")}><Link to="/">Home</Link></li>
                        <li className={activeClass("/search")}><Link to="/search">Search</Link></li>
                        <li className={activeClass("/signOut")}><Link to="/" onClick={this.LogOut}>Sign Out</Link></li>
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