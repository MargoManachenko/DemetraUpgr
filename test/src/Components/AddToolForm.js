import React from 'react';
import Selectors from '../Components/Selectors';
import props from "../Pages/Home";

class AddToolForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: localStorage.userId,
            baseType: '0',
            specificType: '0',
            toolName: '',
            toolInfo: '',
            toolQuantity: '',
            formErrors: {},
            success: '',
            errorMessage: null
        };

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleAddingTool = this.handleAddingTool.bind(this);
    }


    handleTypeChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleAddingTool = async (e) => {
        e.preventDefault();
        const {toolName, toolInfo, toolQuantity, baseType, specificType} = this.state;
        console.log(this.state)
        let errors = {};
        if (toolName === "") {
            errors.name = "please, enter tool's name"
        }
        if (toolQuantity === "") {
            errors.quantity = "please, enter tool's quantity"
        }
        if (Object.keys(errors).length === 0) {
            const responce = await fetch('/tool/addTool', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: localStorage.getItem('userId'),
                    toolName: toolName,
                    toolInfo: toolInfo,
                    toolQuantity: toolQuantity,
                    baseType: baseType,
                    specificType: specificType
                })
            });
            const res = await responce.json();
            console.log(res);

            this.setState({
                success: res.success
            });

            if(res.success){
                this.props.HandleAddingTool(res.newTool);
            }
        }
        else {
            this.setState({
                formErrors: errors
            })
        }
    };

    render() {
        if (this.state.success === true && !this.state.errorMessage) {
            return (
                <div className="add-tool-form">
                    <h3 style={{margin: 0}}>A new tool was successfully added.</h3>
                </div>
            )
        }
        if (this.state.errorMessage) {
            return (
                <div className="add-tool-form">
                    <h3 style={{margin: 0}}>An error occurred while processing the form. Please, try later.</h3>
                </div>
            )
        }
        else {
            return (
                <div className="add-tool-form">
                    <h3>Add a new tool or equipment</h3>
                    <Selectors
                        handleTypeChange={this.handleTypeChange}
                        baseType={this.state.baseType}
                        searchBar={false}
                    />
                    <div style={{display: this.state.baseType !== '0' ? "block" : "none"}}>
                        <input type="text" placeholder="Name" name="toolName" onChange={this.handleTypeChange}/>
                        <input type="text" placeholder="Info" name="toolInfo" onChange={this.handleTypeChange}/>
                        <input type="number" min="0" placeholder="Quantity" name="toolQuantity"
                               onChange={this.handleTypeChange}/>
                        <button className="add-tool-form-btn" onClick={this.handleAddingTool}>Add Tool</button>
                        <p className="error">{this.state.formErrors.name}</p>
                        <p className="error">{this.state.formErrors.quantity}</p>
                    </div>
                </div>
            )
        }

    }
}

export default AddToolForm;