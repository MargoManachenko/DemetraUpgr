import React from 'react';

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

                <select name="baseType" value={this.state.baseType} onChange={this.handleTypeChange}>
                    <option value="0">Choose base equipment type</option>
                    <option value="1">Livestock equipment</option>
                    <option value="2">Equipment for crop production</option>
                    <option value="3">Equipment for growing and processing grain</option>
                    <option value="4">Sorting agricultural equipment</option>
                    <option value="5">Fisheries equipment</option>
                </select>

                {/*Livestock equipment*/}
                <select name="specificType" value={this.state.specificType} onChange={this.handleTypeChange}
                        style={{display: this.state.baseType === '1' ? "block" : "none"}}>
                    <option value="0"> Beekeeping equipment</option>
                    <option value="1">Feed Extruders</option>
                    <option value="2">Poultry equipment</option>
                    <option value="3"> Equipment for pig breeding</option>
                    <option value="4"> Drinkers and accessories</option>
                    <option value="5"> Veterinary equipment</option>
                    <option value="6"> Milk analyzers</option>
                    <option value="7"> Feed Grades</option>
                    <option value="8"> Livestock equipment, general</option>
                </select>

                {/*Equipment for crop production*/}
                <select name="specificType" value={this.state.specificType} onChange={this.handleTypeChange}
                        style={{display: this.state.baseType === '2' ? "block" : "none"}}>
                    <option value="0">Biomass Processing Equipment</option>
                    <option value="1">Greenhouses</option>
                    <option value="2">Greenhouses accessorise</option>
                    <option value="3">Automatic watering equipment</option>
                    <option value="4">Accessories and spare parts for sprayers</option>
                    <option value="5">Equipment for chemical protection and fertilization</option>
                    <option value="6">Equipment for crop production, general</option>
                </select>

                {/*Equipment for growing and processing grain*/}
                <select name="specificType" value={this.state.specificType} onChange={this.handleTypeChange}
                        style={{display: this.state.baseType === '3' ? "block" : "none"}}>
                    <option value="0">Vibropneumatic tables</option>
                    <option value="1">Grain loaders</option>
                    <option value="2">Grain Cleaning Machines</option>
                    <option value="3">Grain separators</option>
                    <option value="4">Laboratory equipment for the grain industry</option>
                    <option value="5">Equipment for growing and processing grain, general</option>
                </select>

                {/*Sorting agricultural equipment*/}
                <select name="specificType" value={this.state.specificType} onChange={this.handleTypeChange}
                        style={{display: this.state.baseType === '4' ? "block" : "none"}}>
                    <option value="0">Photoseparator</option>
                    <option value="1"> Cleaner</option>
                    <option value="2"> Garden sieve</option>
                    <option value="3">Grain thrower</option>
                    <option value="4">Sorting table</option>
                    <option value="5">Equipment for growing and processing grain, general</option>
                </select>

                {/*Fisheries equipment*/}
                <select name="specificType" value={this.state.specificType} onChange={this.handleTypeChange}
                        style={{display: this.state.baseType === '5' ? "block" : "none"}}>
                    <option value="0">Water softeners</option>
                    <option value="1">PH meter</option>
                    <option value="2">Oxygenators</option>
                    <option value="3">Aerators for reservoirs</option>
                    <option value="4">Auto feeders, feeders for fisheries</option>
                    <option value="5">Fisheries equipment, general</option>
                </select>

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