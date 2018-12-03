import React from 'react';
import Base from '../Components/Base';
import SearchBar from '../Components/SearchBar';

class Search extends React.Component{
    render(){
        return(
            <Base>
                <div className="main search">
                    <h2>Search a tool or equipment</h2>
                    <SearchBar/>
                </div>
            </Base>
        )
    }
}

export default Search;