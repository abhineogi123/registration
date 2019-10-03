import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps= state =>{
    return {
        Users: state.Users
    }
}
class DashBoard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<React.Fragment>
            <p>
                <div>{this.props.Users.length} users have registered this session</div>
                <div>Check user list to see details</div>
            </p>
        </React.Fragment>)
    }
}

export default connect(mapStateToProps)(DashBoard);