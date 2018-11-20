import React from 'react';
import Base from '../Components/Base';
import {ValidateSignUpForm} from '../Modules/Validate';

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            response: '',
            nameValid: true,
            emailValid: true,
            passwordValid: true,
            formErrors: {name: '', email: '', password: ''}
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }

    handleChange = (e) => {
        let itemValid = e.target.name + 'Valid';
        this.setState({
            [e.target.name]: e.target.value,
            [ itemValid ]: true
        })
    };

    sendForm = async (e) => {
        e.preventDefault();
        const {name, email, password} = this.state;
        this.setState({
            formErrors: {name: '', email: '', password: ''}
        });

        let validationResult = ValidateSignUpForm(name, email, password);

        let nameValid = !validationResult.name;
        let emailValid = !validationResult.email;
        let passwordValid = !validationResult.password;
        let isError = false;
        if (!nameValid || !emailValid || !passwordValid) {
            console.log(validationResult);
            isError = true;
            this.setState({
                formErrors: validationResult,
                nameValid: nameValid,
                emailValid: emailValid,
                passwordValid: passwordValid
            })
        }
        if (!isError) {
            const response = await fetch('/auth/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });
            const res = await response.json();
            this.setState({
                response: res.message,
                name: '',
                email: '',
                password: ''
            });
            setTimeout(() => {
                this.setState({response: ''});
            }, 6000);
        }
    };

    render() {
        return (
            <Base>
                <div className="main main-content">
                    <h1>Sign Up</h1>
                    <form onSubmit={this.sendForm} className="sign-up-form">
                        <input type="text" name="name" autoComplete="off" placeholder="Name"
                               onChange={this.handleChange}/>
                        <input type="text" name="email" autoComplete="off" placeholder="Email"
                               onChange={this.handleChange}/>
                        <input type="text" name="password" autoComplete="off" placeholder="Password"
                               onChange={this.handleChange}/>
                        <button className="send">Sign Up</button>
                        <p className="result">{this.state.response}</p>
                        <p className="result error">{this.state.formErrors.name}</p>
                        <p className="result error">{this.state.formErrors.email}</p>
                        <p className="result error">{this.state.formErrors.password}</p>
                    </form>
                </div>
            </Base>
        )
    };
}

export default SignUp;