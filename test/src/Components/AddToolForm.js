import React from 'react';

class AddToolForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: localStorage.userId,
            baseType: '0',
            specificType: '',
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
        let errors = {};
        if (toolName === "") {
            errors.name = "please, enter tool's name"
        }
        if (toolQuantity === "") {
            errors.quantity = "please, enter tool's quantity"
        }
        if (Object.keys(errors).length === 0) {
            const response = await fetch('/tool/addTool', {
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
            const res = await response.json();
            console.log(res);

            this.setState({
                success: res.success
            }, console.log(this.state))
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

                    <select name="baseType" onChange={this.handleTypeChange}>
                        <option value="0">Choose base equipment type</option>
                        <option value="1">Livestock equipment</option>
                        <option value="2">Equipment for crop production</option>
                        <option value="3">Equipment for growing and processing grain</option>
                        <option value="4">Sorting agricultural equipment</option>
                        <option value="5">Fisheries equipment</option>
                    </select>

                    {/*Livestock equipment*/}
                    <select name="specificType" onChange={this.handleTypeChange}
                            style={{display: this.state.baseType === '1' ? "block" : "none"}}>
                        <option value="0"> Beekeeping equipment</option>
                        <option value="1">Feed Extruders</option>
                        <option value="2">Poultry equipment</option>
                        <option value="3"> Equipment for pig breeding</option>
                        <option value="4"> Drinkers and accessories</option>
                        <option value="5"> Veterinary equipment</option>
                        <option value="5"> Milk analyzers</option>
                        <option value="5"> Feed Grades</option>
                        <option value="5"> Livestock equipment, general</option>
                    </select>

                    {/*Equipment for crop production*/}
                    <select name="specificType" onChange={this.handleTypeChange}
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
                    <select name="specificType" onChange={this.handleTypeChange}
                            style={{display: this.state.baseType === '3' ? "block" : "none"}}>
                        <option value="0">Vibropneumatic tables</option>
                        <option value="1">Grain loaders</option>
                        <option value="2">Grain Cleaning Machines</option>
                        <option value="3">Grain separators</option>
                        <option value="4">Laboratory equipment for the grain industry</option>
                        <option value="5">Equipment for growing and processing grain, general</option>
                    </select>

                    {/*Sorting agricultural equipment*/}
                    <select name="specificType" onChange={this.handleTypeChange}
                            style={{display: this.state.baseType === '4' ? "block" : "none"}}>
                        <option value="0">Photoseparator</option>
                        <option value="1"> Cleaner</option>
                        <option value="2"> Garden sieve</option>
                        <option value="3">Grain thrower</option>
                        <option value="4">Sorting table</option>
                        <option value="5">Equipment for growing and processing grain, general</option>
                    </select>

                    {/*Fisheries equipment*/}
                    <select name="specificType" onChange={this.handleTypeChange}
                            style={{display: this.state.baseType === '5' ? "block" : "none"}}>
                        <option value="0">Water softeners</option>
                        <option value="1">PH meter</option>
                        <option value="2">Oxygenators</option>
                        <option value="3">Aerators for reservoirs</option>
                        <option value="4">Auto feeders, feeders for fisheries</option>
                        <option value="5">Fisheries equipment, general</option>
                    </select>

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