import React from 'react';
import { connect } from 'react-redux';
import { AddLoginDetails } from '../redux/ActionCreators';
import { withRouter } from 'react-router-dom';
function mapDispatchToProps(dispatch) {
    return {
        SetLoginDetails: (loginDetails) => dispatch(AddLoginDetails(loginDetails))
    }
}

class LoginDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            errors: {}
        }
        this.password = React.createRef(null);
        this.confirmPassword = React.createRef(null);
        this.HandleInputChanges = this.HandleInputChanges.bind(this);
        this.HandleSubmitClick = this.HandleSubmitClick.bind(this);
        this.ValidateEmail = this.ValidateEmail.bind(this);
        this.ValidatePassword = this.ValidatePassword.bind(this);
        this.ValidateUsername = this.ValidateUsername.bind(this);
    }

    HandleInputChanges(e) {

        e.preventDefault();
        if (this.ValidateFields(e)) {
            this.setState({
                [e.target.id]: e.target.value
            })
        }
    }
    HandleSubmitClick() {

        var { username, email, password } = this.state;
        if (username !== "" && email !== "" && password !== "") {
            if (Object.keys(this.state.errors).length === 0) {
                this.props.SetLoginDetails({
                    username,
                    email,
                    password
                });
                this.props.history.push({ pathname: "/Registration" })
            }
            else {
                alert("Invalid Fields")
            }
        }
        else {
            let allErrors = {};
            if (username === "")
                allErrors.username = "username cannot be blank!";
            if (email === "")
                allErrors.email = "You have entered an invalid email address!";
            if (password === "")
                allErrors.password = "Password cannot be Blank!!"

            this.setState({ errors: { ...this.state.errors, ...allErrors } })
        }

    }
    ValidateFields(e) {
        switch (e.target.id) {
            case "email": {
                return this.ValidateEmail(e.target.value);
            }
            case "password": {
                return this.ValidatePassword();
            }
            case "confirmPassword": {
                return this.ValidatePassword();
            }
            case "username": {
                return this.ValidateUsername(e.target.value);
            }
            default:
                return true
        }
    }
    ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            let { errors } = this.state;
            delete errors.email;
            this.setState({ errors: { ...errors } });
            return (true)
        }
        this.setState({ errors: { ...this.state.errors, email: "You have entered an invalid email address!" } })
    }
    ValidatePassword() {
        if (this.password.current.value === this.confirmPassword.current.value) {
            let { errors } = this.state;
            delete errors.password;
            this.setState({ errors: { ...errors } });
            return true;
        }
        this.setState({ errors: { ...this.state.errors, password: "Passwords don't match!" } })
        return (true)
    }
    ValidateUsername(username) {

        if (username !== "") {
            let { errors } = this.state;
            delete errors.username;
            this.setState({ errors: { ...errors } });
            return true;
        }
        this.setState({ errors: { ...this.state.errors, username: "username cannot be blank!" } })
        return (false)
    }
    componentWillUnmount(){
        //this.props.SetLoginDetails({});
    }
    render() {
        return (<React.Fragment>
            <div className="user-registration-wrapper">
                <div className="user-registration">
                    <div className="title">SignUp New User</div>

                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>UserName</span>
                            <span>:*</span>
                        </span>
                        <input id="username" type="text" onChange={this.HandleInputChanges} />
                    </div>
                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>Email</span>
                            <span>:*</span>
                        </span>
                        <input id="email" type="email" onChange={this.HandleInputChanges} />
                    </div>

                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>Password</span>
                            <span>:*</span>
                        </span>
                        <input ref={this.password} id="password" type="password" onChange={this.HandleInputChanges} />
                    </div>
                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>Confirm Password</span>
                            <span>:*</span>
                        </span>
                        <input ref={this.confirmPassword} id="confirmPassword" type="password" onChange={this.HandleInputChanges} />
                    </div>

                    <span id="error" className="error">
                        <ul>
                            {Object.keys(this.state.errors).map(key =>
                                <li><span>{key}</span>:<span>{this.state.errors[key]}</span></li>
                            )}
                        </ul>
                    </span>
                    <button className="bottombtn" onClick={this.HandleSubmitClick}>
                        <span className="sendbtn">Sign Up</span>
                    </button>
                </div>
            </div>
        </React.Fragment>)
    }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginDetails));