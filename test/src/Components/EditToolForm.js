import React from 'react';
import Selectors from '../Components/Selectors';

class EditToolForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toolId: props.toolId,
            baseType: props.baseType,
            specificType: props.specificType,
            toolName: props.toolName,
            toolInfo: props.toolInfo,
            toolQuantity: props.toolQuantity,
            formErrors: {},
            success: '',
            errorMessage: null
        };

        console.log(this.state);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.updateTool = this.updateTool.bind(this);
    }

    handleTypeChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    updateTool = async(e) =>{
        e.preventDefault();

        const {toolId, toolName, toolInfo, toolQuantity, baseType, specificType} = this.state;
        let errors = {};
        if (toolName === "") {
            errors.name = "please, enter tool's name"
        }
        if (toolQuantity === "") {
            errors.quantity = "please, enter tool's quantity"
        }
        if (Object.keys(errors).length === 0) {
            const response = await fetch('/tool/editTool', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    toolId: toolId,
                    baseType: baseType,
                    specificType: specificType,
                    toolName: toolName,
                    toolInfo: toolInfo,
                    toolQuantity: toolQuantity
                })
            });
            const res = await response.json();
            console.log(res);

            this.setState({
                success: res.success,
                newTool: res.newTool
            });
            this.props.ProcessedEditing(res.success, res.newTool);
            this.props.CancelEditing();
        }
        else {
            this.setState({
                formErrors: errors
            })
        }
    };

    render() {
        return (
            <div className="edit-tool-form">

                <h3>Edit a tool or equipment</h3>

                <Selectors
                    handleTypeChange={this.handleTypeChange}
                    baseType={this.state.baseType}
                    searchBar={false}
                />

                <div style={{display: this.state.baseType !== '0' ? "block" : "none"}}>
                    <input type="text" placeholder="Name" name="toolName" value={this.state.toolName} onChange={this.handleTypeChange}/>
                    <input type="text" placeholder="Info" name="toolInfo" value={this.state.toolInfo} onChange={this.handleTypeChange}/>
                    <input type="number" min="0" placeholder="Quantity" value={this.state.toolQuantity} name="toolQuantity"
                           onChange={this.handleTypeChange}/>
                    <p className="error">{this.state.formErrors.name}</p>
                    <p className="error">{this.state.formErrors.quantity}</p>
                </div>
                <button className="btn-save" onClick={this.updateTool}>Save</button>
                <button className="btn-cancel" onClick={this.props.CancelEditing}>Back</button>
            </div>
        )
    }
}

export default EditToolForm;