const INITIAL_STATE = { notifications : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getNotifications':{
            return {
                notifications        : action.payload.data,
                loader               : !!action.payload.success
            };
        }

        default:
            return state;
    }
};
