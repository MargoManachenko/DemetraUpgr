import React from 'react';
import Selectors from '../Components/Selectors';

class EditToolForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toolId: props.toolId,
            baseTypeNum: props.baseTypeNum,
            specificTypeNum: props.specificTypeNum,
            baseType: props.baseType,
            specificType: props.specificType,
            toolName: props.toolName,
            toolInfo: props.toolInfo,
            toolQuantity: props.toolQuantity,
            image: props.image,
            formErrors: {},
            success: '',
            errorMessage: null
        };

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.updateTool = this.updateTool.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.handleTypeChangeSelectors = this.handleTypeChangeSelectors.bind(this);

        console.log(this.state)
    }

    handleTypeChangeSelectors(e) {
        let strValue = e.target.name.slice(0, -3);
        this.setState({
            [e.target.name]: e.target.value,
            [strValue]: e.target[e.target.value].text
        });
    }

    handleTypeChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            console.log(" event.target.files " + event.target.files[0])
            console.log('size' + Math.round(event.target.files[0].size / 1024) + "kB")
            let reader = new FileReader();
            reader.onload = (e) => {
                console.log('e.target.result' + e.target.result);

                this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    updateTool = async (e) => {
        e.preventDefault();

        const {toolId, toolName, toolInfo, toolQuantity, baseTypeNum, baseType, specificTypeNum, specificType} = this.state;
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
                    baseTypeNum: baseTypeNum,
                    specificTypeNum: specificTypeNum,
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
                    handleTypeChange={this.handleTypeChangeSelectors}
                    baseTypeNum={this.state.baseTypeNum}
                    specificTypeNum={this.state.specificTypeNum}
                    searchBar={false}
                />

                <div style={{display: this.state.baseType !== '0' ? "block" : "none"}}>
                    <input type="text" placeholder="Name" name="toolName" value={this.state.toolName}
                           onChange={this.handleTypeChange}/>
                    <input type="text" placeholder="Info" name="toolInfo" value={this.state.toolInfo}
                           onChange={this.handleTypeChange}/>
                    <input type="number" min="0" placeholder="Quantity" value={this.state.toolQuantity}
                           name="toolQuantity"
                           onChange={this.handleTypeChange}/>

                    <input type="file" onChange={this.onImageChange} className="filetype"
                           id="group_image" placeholder="Browse"/>
                    <img className="tool-img" src={this.state.image}/>

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