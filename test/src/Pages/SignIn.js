import React from 'react';
import Base from '../Components/Base';
import {ValidateSignInForm} from '../Modules/Validate';
import Auth from '../Modules/Auth';

class SignIn extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            response: '',
            emailValid: true,
            passwordValid: true,
            formErrors: {email: '', password: ''}
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
        const {email, password} = this.state;
        this.setState({
            formErrors: { email: '', password: ''}
        });

        let validationResult = ValidateSignInForm(email, password);

        let emailValid = !validationResult.email;
        let passwordValid = !validationResult.password;
        let isError = false;
        if (!emailValid || !passwordValid) {
            isError = true;
            this.setState({
                formErrors: validationResult,
                emailValid: emailValid,
                passwordValid: passwordValid
            })
        }
        if (!isError) {
            const response = await fetch('/auth/signin', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const res = await response.json();
            console.log( res)
            if(res.success){
                this.setState({
                    errors: {},
                    userId: res.user.userID,
                    response: res.message
                });
                localStorage.setItem('userId', res.user.userID);
                console.log(localStorage.getItem('userId'));
                Auth.authenticateUser(res.token, res.user.userID);
                window.location = "/";
            }
            else{
               this.setState({
                   response: res.message
               })
            }
        }
    };

    render() {
        return (
            <Base>
                <div className="main main-content">
                    <h1>Sign In</h1>
                    <form onSubmit={this.sendForm} className="sign-in-form">
                        <input type="text" name="email" autoComplete="off" placeholder="Email"
                               onChange={this.handleChange}/>
                        <input type="password" name="password" autoComplete="off" placeholder="Password"
                               onChange={this.handleChange}/>
                        <button className="send">Sign In</button>
                        <p className="result">{this.state.response}</p>
                        <p className="result error">{this.state.formErrors.email}</p>
                        <p className="result error">{this.state.formErrors.password}</p>
                    </form>
                </div>
            </Base>
        )
    };
}

export default SignIn;