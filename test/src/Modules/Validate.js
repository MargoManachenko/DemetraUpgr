import emailValidator from 'email-validator';

export function ValidateSignUpForm(name, email, password) {
    let formErrors = {name: '', email: '', password: ''};
    if (name.length === 0) {
        formErrors.name = "Name can't be empty.";
    }
    if (password.length === 0) {
        formErrors.password = "Password can't be empty.";
    }
    if(email.length === 0){
        formErrors.email = "Email can't be empty.";
    }
    if(email.length !== 0){
        if (!emailValidator.validate(email)) {
            formErrors.email = "Email is invalid.";
        }
    }

    return formErrors;
}

export function ValidateSignInForm(email, password) {
    let formErrors = {email: '', password: ''};
    if (password.length === 0) {
        formErrors.password = "Password can't be empty.";
    }
    if(email.length === 0){
        formErrors.email = "Email can't be empty.";
    }

    return formErrors;
}