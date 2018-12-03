import React from 'react';
import EditTooldForm from '../Components/EditToolForm';

class Tool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toolId: props.toolId,
            baseType: props.baseType,
            specificType: props.specificType,
            toolName: props.toolName,
            toolInfo: props.toolInfo,
            toolQuantity: props.toolQuantity,
            deleted: false,
            editing: false,
            message: ''
        };

        this.DeleteTool = this.DeleteTool.bind(this);
        this.EditTool = this.EditTool.bind(this);
        this.CancelEditing = this.CancelEditing.bind(this);
        this.ProcessedEditing = this.ProcessedEditing.bind(this);
    }

    async DeleteTool() {
        const response = await fetch('/tool/deleteTool', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.state.toolId
            })
        });
        const res = await response.json();
        this.setState({
            deleted: res.success
        }, console.log(res.deleted))
    }

    EditTool() {
        this.setState({
            editing: true
        })
    }

    CancelEditing() {
        this.setState({
            editing: false
        })
    }

    ProcessedEditing(result, newTool) {
        let messageString;
        if (result) {
            messageString = "The tool was successfully saved."
        }
        else {
            messageString = "Error occurred. Please, try again later."
        }

        this.setState({
            message: messageString,
            baseType: newTool.baseType,
            specificType: newTool.specificType,
            toolName: newTool.toolName,
            toolInfo: newTool.toolInfo,
            toolQuantity: newTool.toolQuantity,
        })
    }

    render() {
        if (this.state.deleted) {
            return (
                <div className="tool-box">
                    <p className="deleted-state">This tool was deleted.</p>
                </div>
            )
        }
        if (this.state.editing) {
            return (
                <div className="tool-box">
                    <EditTooldForm
                        toolId={this.state.toolId}
                        baseType={this.state.baseType}
                        specificType={this.state.specificType}
                        toolName={this.state.toolName}
                        toolInfo={this.state.toolInfo}
                        toolQuantity={this.state.toolQuantity}
                        CancelEditing={this.CancelEditing}
                        ProcessedEditing={this.ProcessedEditing}
                    />
                </div>
            )
        }
        else
            return (
                <div className="tool-box">
                    <p className="number">{this.props.number}</p>
                    <p>{this.state.message}</p>
                    <div className="info-box">
                        <div>
                            <p>Base type:</p>
                            <p>Specific type:</p>
                            <p>Name:</p>
                            <p>Info:</p>
                            <p>Quantity:</p>
                        </div>
                        <div>
                            <p>{this.state.baseType}</p>
                            <p>{this.state.specificType}</p>
                            <p>{this.state.toolName}</p>
                            <p>{this.state.toolInfo}</p>
                            <p>{this.state.toolQuantity}</p>
                        </div>
                    </div>
                    <button className="btn-edit" onClick={this.EditTool}>edit</button>
                    <button className="btn-delete" onClick={this.DeleteTool}>delete</button>
                </div>
            )
    }
}

export default Tool;