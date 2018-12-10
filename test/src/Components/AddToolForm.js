import React from 'react';
import Selectors from '../Components/Selectors';
import props from "../Pages/Home";

class AddToolForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: localStorage.userId,
            baseTypeNum: '0',
            specificTypeNum: '0',
            baseType: '',
            specificType: '',
            toolName: '',
            toolInfo: '',
            toolQuantity: '',
            formErrors: {},
            success: '',
            image: null,
            errorMessage: null
        };

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleAddingTool = this.handleAddingTool.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.handleTypeChangeSelectors = this.handleTypeChangeSelectors.bind(this);

        console.log(this.state)
    }


    handleTypeChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleTypeChangeSelectors(e) {
        let strValue = e.target.name.slice(0, -3);
        this.setState({
            [e.target.name]: e.target.value,
            [strValue]: e.target[e.target.value].text
        },()=> console.log(this.state));
    }

    onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            console.log(" event.target.files " + event.target.files[0])
            console.log('size' + Math.round(event.target.files[0].size/1024) + "kB")
            let reader = new FileReader();
            reader.onload = (e) => {
                console.log('e.target.result' + e.target.result);

                this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    handleAddingTool = async (e) => {
        e.preventDefault();
        const {toolName, toolInfo, toolQuantity, baseTypeNum,  baseType, specificTypeNum,  specificType,  image} = this.state;
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
                    baseTypeNum: baseTypeNum,
                    specificTypeNum: specificTypeNum,
                    baseType: baseType,
                    specificType: specificType,
                    image: image
                })
            });
            const res = await responce.json();
            this.setState({
                success: res.success
            });

            if (res.success) {
                this.props.HandleAddingTool(true ,res.newTool);
            }
        }
        else {
            this.props.HandleAddingTool(false , null);
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
                        handleTypeChangeSelectors={this.handleTypeChangeSelectors}
                        baseTypeNum={this.state.baseTypeNum}
                        searchBar={false}
                    />
                    <div style={{display: this.state.baseTypeNum !== '0' ? "block" : "none"}}>
                        <input type="text" placeholder="Name" name="toolName" onChange={this.handleTypeChange}/>
                        <input type="text" placeholder="Info" name="toolInfo" onChange={this.handleTypeChange}/>
                        <input type="number" min="0" placeholder="Quantity" name="toolQuantity"
                               onChange={this.handleTypeChange}/>
                        <input type="file" onChange={this.onImageChange} className="filetype"
                               id="group_image" placeholder="Browse"/>
                        <img className="tool-img" src={this.state.image}/>
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