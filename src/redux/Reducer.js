import {ADD_LOGIN_DETAILS,ADD_REGISTERED_USER} from './ActionCreators' ;

const initialState ={
    LoginDetails:{},
    Users:[]
}

export const reducer = (state=initialState, action) => {
    switch(action.type){
        case ADD_LOGIN_DETAILS:{
            if(Object.keys(action.payload).length > 0){
                return {
                    ...state, LoginDetails:{
                        ...state.LoginDetails, ...action.payload
                    }
                }
            }
            else{
                return {...state, LoginDetails:{}}
            }
            break;
        }
        case ADD_REGISTERED_USER:{
            return {
                ...state, Users:[
                    action.payload.user, ...state.Users
                ]
            }
            break;
        }
        default:{
            return {...state}
        }
    }
}