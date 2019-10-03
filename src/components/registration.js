import React from 'react';
import { connect } from 'react-redux';
import { AddRegisteredUser,AddLoginDetails } from '../redux/ActionCreators';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
    return {
        LoginDetails: state.LoginDetails
    }
}
function mapDispatchToProps(dispatch) {
    return {
        AddRegisteredUser: (user) => dispatch(AddRegisteredUser(user)),
        SetLoginDetails: (loginDetails) => dispatch(AddLoginDetails(loginDetails))
    }
}

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstName: "",
            LastName: "",
            Address1: "",
            Address2: "",
            ZIP: "",
            City: "",
            Phone: "",
            errors: []
        }
        this.HandleInputChanges = this.HandleInputChanges.bind(this);
        this.HandleSubmitClick = this.HandleSubmitClick.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props.LoginDetails)
        if (Object.keys(props.LoginDetails).length == 0) {
            props.history.push({ pathname: "/Login" });
            return null;
        }
        return null;
    }

    HandleInputChanges(e) {
        let valid = false;
        if (e.target.id === "ZIP") {
            valid = this.ValidateZip(e.target.value);
        }
        else if (e.target.id === "Phone") {
            valid = this.ValidatePhone(e.target.value);
        }
        else {
            if (e.target.value !== "")
                valid = true
        }
        console.log(valid)
        if (valid) {
            this.setState({
                [e.target.id]: e.target.value
            })
        }

    }
    HandleSubmitClick() {
        let { FirstName, LastName, Address1, Address2, ZIP, City, Phone } = this.state;
        let objDetails = { FirstName, LastName, Address1, Address2, ZIP, City, Phone };
        let objErrors = {}
        for (var key in objDetails) {
            if (objDetails[key] == "") {
                objErrors[key] = key + " cannot be blank";
            }
        }
        if (Object.keys(objErrors).length === 0) {
            this.props.AddRegisteredUser({ ...this.props.LoginDetails, FirstName, LastName, Address1, Address2, ZIP, City, Phone });
            this.props.SetLoginDetails({});
            this.props.history.push({ pathname: "/DashBoard" })
        }
        else {
            
            this.setState({errors:{...objErrors}})
        }


    }
    ValidateZip(zip) {
        if (/\d{6}/.test(zip)){
            let {errors} = this.state;
            delete errors.ZIP;
            this.setState({errors:{...errors}});
            return true;
        }
        this.setState({errors:{...this.state.errors, ZIP:"You have entered an invalid ZIP code!"}})
        return false
    }
    ValidatePhone(phone) {
        if (/\d{10}/.test(phone)){
            let {errors} = this.state;
            delete errors.Phone;
            this.setState({errors:{...errors}});
            return true;
        }
        this.setState({errors:{...this.state.errors, Phone:"You have entered an invalid Phone number!"}})
        return false
    }
    
    render() {
        console.log("render")
        return (<React.Fragment>

            <div className="user-registration-wrapper">
                <div className="user-registration">
                    <div className="title">Enter User Details</div>
                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>UserName</span>
                            <span>:*</span>
                        </span>
                        <input disabled id="username" type="text" value={this.props.LoginDetails.username} />
                    </div>
                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>FirstName</span>
                            <span>:*</span>
                        </span>
                        <input id="FirstName" type="text" onChange={this.HandleInputChanges} />
                    </div>
                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>LastName</span>
                            <span>:*</span>
                        </span>
                        <input id="LastName" type="text" onChange={this.HandleInputChanges} />
                    </div>

                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>Address: Line 1</span>
                            <span>:*</span>
                        </span>
                        <input id="Address1" type="text" onChange={this.HandleInputChanges} />
                    </div>
                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>Address: Line 2</span>
                            <span>:*</span>
                        </span>
                        <input id="Address2" type="text" onChange={this.HandleInputChanges} />
                    </div>
                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>ZIP</span>
                            <span>:*</span>
                        </span>
                        <input id="ZIP" type="text" maxLength={6} pattern="\d{6}" onChange={this.HandleInputChanges} />
                    </div>
                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>City</span>
                            <span>:*</span>
                        </span>
                        <input id="City" type="text" onChange={this.HandleInputChanges} />
                    </div>
                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>Phone</span>
                            <span>:*</span>
                        </span>
                        <input id="Phone" type="text" onChange={this.HandleInputChanges} />
                    </div>

                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>E-Mail</span>
                            <span>:*</span>
                        </span>
                        <input disabled id="E-Mail" type="text" value={this.props.LoginDetails.email} />
                    </div>
                    <div className="form-input-flex">
                        <span className="form-input-flex text-color">
                            <span>Password </span>
                        </span>
                        <input disabled id="Password" type="password" value={this.props.LoginDetails.password} />
                    </div>

                    <button className="bottombtn">
                        <span className="sendbtn" onClick={this.HandleSubmitClick}>Submit</span>
                    </button>

                    <span id="error" className="error">
                        <ul>
                            {Object.keys(this.state.errors).map(key =>
                                <li><span>{key}</span>:<span>{this.state.errors[key]}</span></li>
                            )}
                        </ul>
                    </span>
                </div>
            </div>
        </React.Fragment>)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration));