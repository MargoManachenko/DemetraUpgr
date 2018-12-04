import React from 'react';
import Base from '../Components/Base';
import AddToolForm from '../Components/AddToolForm';
import Tool from '../Components/Tool';
import SearchBar from '../Components/SearchBar';

class HomeAuthorized extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addingTool: false,
            addingToolBtn: false,
            listOfTools: []
        };
        this.showAddDialogue = this.showAddDialogue.bind(this);
        this.GetAllOwnedTools = this.GetAllOwnedTools.bind(this);
        this.HandleAddingTool = this.HandleAddingTool.bind(this);
    }

    componentWillMount() {
        this.GetAllOwnedTools();
        console.log(this.state)
    }

    async GetAllOwnedTools() {
        if (localStorage.getItem('userId')) {
            const response = await fetch('/tool/getTools', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: localStorage.getItem('userId')
                })
            });
            const res = await response.json();
            this.setState({
                listOfTools: res.listOfTools
            })
        }

    }

    HandleAddingTool(newTool) {
        console.log("yey", newTool)
        let newToolsList = this.state.listOfTools;
        newToolsList.push(newTool)
        this.setState({
            addingToolBtn: !this.state.addingToolBtn,
            listOfTools: newToolsList
        })
    }


    showAddDialogue() {
        this.setState({
            addingTool: true,
            addingToolBtn: !this.state.addingToolBtn
        })
    }

    render() {
        if (localStorage.getItem('userId')) {
            return (
                <Base>
                    <div className="main main-content">
                        <h2>List of your tools</h2>
                        <button className="add-tool"
                                onClick={this.showAddDialogue}>{this.state.addingToolBtn ? "Cancel" : "Add new"} </button>
                        {this.state.addingTool ?
                            <AddToolForm
                                HandleAddingTool={this.HandleAddingTool}
                            /> : null}
                        <div className="your-tools">
                            {this.state.listOfTools.length !== 0 ?
                                this.state.listOfTools.map((tool, index) => (
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
                </Base>
            )
        }

        else {
            return (
                <Base>
                    <div className="main main-content">
                        <h1>This is home for an unauthorised user.</h1>
                        <SearchBar/>
                    </div>
                </Base>
            )

        }
    };
}

export default HomeAuthorized;