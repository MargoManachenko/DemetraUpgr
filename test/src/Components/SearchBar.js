import React from 'react';
import Selectors from '../Components/Selectors';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseType: '0'
        };
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    handleTypeChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="searchBar">
                <Selectors
                    handleTypeChange={this.handleTypeChange}
                    baseType={this.state.baseType}
                    searchBar={true}
                />
                <input type="text"/>
                <button className="search">Search</button>
            </div>
        )
    }
}

export default SearchBar;