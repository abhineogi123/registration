import React from 'react';
import {connect} from 'react-redux';


const mapStateToProps= state =>{
    return {
        Users: state.Users
    }
}

class UserList extends React.Component{
    constructor(props){
        super(props);
    }

    GetTableHeaders(){
        if(this.props.Users.length > 0){
           return Object.keys(this.props.Users[0]).map(key => {
               return <th>{key}</th>
           });                     
        }
        return null
    }
    render(){
        return (<React.Fragment>
            UserList
            <table id="userTable">
                <thead>
                    <tr>
                        {
                            this.GetTableHeaders()
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.Users.map(user=>{
                            return (<tr>
                                {
                                    Object.keys(user).map(key => {
                                        return <td>{user[key]}</td>
                                    })
                                }
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </React.Fragment>)
    }
}

export default connect(mapStateToProps)(UserList);