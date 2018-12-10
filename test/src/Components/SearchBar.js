import React from 'react';
import Selectors from '../Components/Selectors';
import Tool from "./Tool";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseTypeNum: '0',
            specificTypeNum: '0',
            baseType: '',
            specificType: '',
            nameSearch: '',
            searchList: null,
            success: null,
            searchInfo: null
        };
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleTypeChangeSelectors = this.handleTypeChangeSelectors.bind(this);
        this.SearchTool = this.SearchTool.bind(this);
    }

    handleTypeChangeSelectors(e) {
        let strValue = e.target.name.slice(0, -3);
        this.setState({
            [e.target.name]: e.target.value,
            [strValue]: e.target[e.target.value].text
        }, () => console.log(this.state));
    }

    handleTypeChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    SearchTool = async (e) => {
        e.preventDefault();
        const {baseTypeNum, specificTypeNum,  specificType, nameSearch} = this.state;
        console.log(this.state);
        if (baseTypeNum || nameSearch) {

            const responce = await fetch('/tool/search', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    baseTypeSearch: baseTypeNum,
                    specificTypeSearch: specificTypeNum,
                    specificTypeSting: specificType,
                    nameSearch: nameSearch
                })
            });
            const res = await responce.json();
           this.setState({
               searchList: []
           });
            this.setState({
                success: res.success,
                searchList:  res.searchList,
                searchInfo: res.searchInfo
            }, console.log(this.state.searchList))
        }
    };

    render() {

        return (
            <div className="searchBlock">
                <div className="searchBar">
                    <Selectors
                        handleTypeChangeSelectors={this.handleTypeChangeSelectors}
                        baseTypeNum={this.state.baseTypeNum}
                        searchBar={true}
                        className="searchbar"
                    />
                    <input type="text" placeholder="Name" name="nameSearch" onChange={this.handleTypeChange}/>
                    <button className="search" onClick={this.SearchTool}>Search</button>
                </div>
                <p className="search-info">{this.state.searchInfo}</p>
                <div className="your-tools">
                    {this.state.searchList ?
                        this.state.searchList.reverse().map((tool, index) => (
                            <Tool
                                number={index + 1 + " "}
                                toolId={tool._id}
                                // baseTypeNum={tool.baseTypeNum}
                                // specificTypeNum={tool.specificTypeNum}
                                baseType={tool.baseType}
                                specificType={tool.specificType}
                                toolName={tool.toolName}
                                toolInfo={tool.toolInfo}
                                toolQuantity={tool.toolQuantity}
                                image={tool.image}
                                toolSearch={true}
                            />
                        )) :  null}
                </div>
            </div>
        )
    }
}

export default SearchBar;