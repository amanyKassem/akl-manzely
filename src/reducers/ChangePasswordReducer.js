const INITIAL_STATE = { changePassword : null , loader : false, message: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getChangePassword':{
            return ({...state, changePassword  : action.payload.data,
                message : action.payload.message,
                loader: !!action.payload.success, });
        }

        default:
            return state;
    }
};
