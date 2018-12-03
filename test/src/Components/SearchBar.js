import React from 'react';
import Selectors from '../Components/Selectors';
import Tool from "./Tool";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseType: '0',
            specificType: '',
            nameSearch: '',
            searchList: null,
            success: null,
            searchInfo: null
        };
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.SearchTool = this.SearchTool.bind(this);
    }

    handleTypeChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    SearchTool = async (e) => {
        e.preventDefault();
        const {baseType, specificType, nameSearch} = this.state;
        console.log(this.state);
        if (baseType || nameSearch) {

            const responce = await fetch('/tool/search', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    baseTypeSearch: baseType,
                    specificTypeSearch: specificType,
                    nameSearch: nameSearch
                })
            });
            const res = await responce.json();
            console.log("123")
            this.setState({
                success: res.success,
                searchList: res.searchList,
                searchInfo: res.searchInfo
            })
        }
    };

    render() {
        return (
            <div className="searchBar">
                <Selectors
                    handleTypeChange={this.handleTypeChange}
                    baseType={this.state.baseType}
                    searchBar={true}
                    className="searchbar"
                />
                <input type="text" placeholder="Name" name="nameSearch" onChange={this.handleTypeChange}/>
                <button className="search" onClick={this.SearchTool}>Search</button>
                <div className="your-tools">
                    {this.state.searchList ?
                        this.state.searchList.map((tool, index) => (
                            <Tool
                                number={index + 1 + " "}
                                toolId={tool._id}
                                baseType={tool.baseType}
                                specificType={tool.specificType}
                                toolName={tool.toolName}
                                toolInfo={tool.toolInfo}
                                toolQuantity={tool.toolQuantity}
                            />
                        )) : null}
                </div>
            </div>
        )
    }
}

export default SearchBar;