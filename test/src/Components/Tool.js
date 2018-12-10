import React from 'react';
import EditTooldForm from '../Components/EditToolForm';
import noImgIcon from '../public/no-image-icon.jpg';

class Tool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toolId: props.toolId,
            baseType: props.baseType,
            specificType: props.specificType,
            baseTypeNum: props.baseTypeNum,
            specificTypeNum: props.specificTypeNum,
            toolName: props.toolName,
            toolInfo: props.toolInfo,
            toolQuantity: props.toolQuantity,
            image: props.image,
            deleted: false,
            editing: false,
            message: ''
        };

        this.DeleteTool = this.DeleteTool.bind(this);
        this.EditTool = this.EditTool.bind(this);
        this.CancelEditing = this.CancelEditing.bind(this);
        this.ProcessedEditing = this.ProcessedEditing.bind(this);
    }

    componentWillMount() {
        if (!this.state.image) {
            this.setState({
                image: noImgIcon
            })
        }
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
            messageString = "Successfully saved."
        }
        else {
            messageString = "Error occurred. Please, try again later."
        }

        console.log(newTool)

        this.setState({
            message: messageString,
            baseTypeNum: newTool.baseTypeNum,
            specificTypeNum: newTool.specificTypeNum,
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
                        baseTypeNum={this.state.baseTypeNum}
                        specificTypeNum={this.state.specificTypeNum}
                        baseType={this.state.baseType}
                        specificType={this.state.specificType}
                        toolName={this.state.toolName}
                        toolInfo={this.state.toolInfo}
                        toolQuantity={this.state.toolQuantity}
                        image={this.state.image}
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
                    <p className="result-edit-tool">{this.state.message}</p>
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
                        <img src={this.state.image} alt=""/>
                    </div>
                    {!this.props.toolSearch && <button className="btn-edit" onClick={this.EditTool}>edit</button>}
                    {!this.props.toolSearch && <button className="btn-delete" onClick={this.DeleteTool}>delete</button>}
                    {this.props.toolSearch && <button className="btn-contact">contact lessor</button>}
                </div>
            )
    }
}

export default Tool;