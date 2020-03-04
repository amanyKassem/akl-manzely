const INITIAL_STATE = { bankAcoounts : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getBankAcoounts':{
            return {
                bankAcoounts        : action.payload.data,
                loader               : !!action.payload.success
            };
        }
        default:
            return state;
    }
};
