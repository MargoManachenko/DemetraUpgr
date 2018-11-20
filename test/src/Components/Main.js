import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../Pages/Home';
import HomeAuthorized from '../Pages/HomeAuthorized';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';


class Main extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <main>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/home" component={HomeAuthorized}/>
                    <Route path="/signIn" component={SignIn}/>
                    <Route path="/signUp" component={SignUp}/>
                </Switch>
            </main>
        )
    }

}

export default Main;