export const ADD_LOGIN_DETAILS = "ADD_LOGIN_DETAILS";
export const ADD_REGISTERED_USER = "ADD_REGISTERED_USER";

export const AddLoginDetails = (loginDetails) => {
    return {
        type: ADD_LOGIN_DETAILS,
        payload:{
            ...loginDetails
        }
    }
}

export const AddRegisteredUser = (user) => {
    return {
        type: ADD_REGISTERED_USER,
        payload:{
            user
        }
    }
};


