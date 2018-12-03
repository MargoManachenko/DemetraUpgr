import React from 'react';
import Header from '../Components/Header';

class Base extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div className="wrapper">
                <div className="content">
                    <Header/>
                    {this.props.children}
                </div>
            </div>
        )
    };
}

export default Base;