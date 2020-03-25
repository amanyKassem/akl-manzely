const INITIAL_STATE = { bill : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getBill':{
            return {
                bill        : action.payload.data,
                loader               : !!action.payload.success
            };
        }

        default:
            return state;
    }
};
