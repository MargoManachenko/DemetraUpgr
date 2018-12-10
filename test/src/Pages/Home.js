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
            listOfTools: [],
            resultAddingTool: false
        };
        this.showAddDialogue = this.showAddDialogue.bind(this);
        this.GetAllOwnedTools = this.GetAllOwnedTools.bind(this);
        this.HandleAddingTool = this.HandleAddingTool.bind(this);
        this.ErraseResult = this.ErraseResult.bind(this);
    }

    componentWillMount() {
        this.GetAllOwnedTools();
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

    HandleAddingTool(success ,newTool) {
        if(success){
            let newToolsList = this.state.listOfTools;
            this.setState({
                listOfTools: [],
                addingTool: false
            });
            console.log('newTool' , newTool)
            newToolsList.push(newTool);
            this.setState({
                addingToolBtn: !this.state.addingToolBtn,
                listOfTools: newToolsList,
                resultAddingTool: "A new tool was successfully added."
            });
            this.ErraseResult();
            console.log(this.state.listOfTools)
        }
        else{
            this.setState({
                resultAddingTool: "An error occurred while processing the form. Please, try later."
            });
            this.ErraseResult();
        }
    }

    ErraseResult(){
        setTimeout(()=> this.setState({
            resultAddingTool: false
        }), 5000)
    }

    showAddDialogue() {
        this.setState({
            addingTool: !this.state.addingTool,
            addingToolBtn: !this.state.addingToolBtn,
            resultAddingTool: false
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

                        {this.state.resultAddingTool && <h3 className="add-tool-result">{this.state.resultAddingTool}</h3>}

                        <div className="your-tools">
                            {this.state.listOfTools.length !== 0 ?
                                this.state.listOfTools.reverse().map((tool, index) => (
                                    <Tool
                                        number={index + 1 + " "}
                                        toolId={tool._id}
                                        baseType={tool.baseType}
                                        specificType={tool.specificType}
                                        baseTypeNum={tool.baseTypeNum}
                                        specificTypeNum={tool.specificTypeNum}
                                        toolName={tool.toolName}
                                        toolInfo={tool.toolInfo}
                                        toolQuantity={tool.toolQuantity}
                                        image={tool.image}
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