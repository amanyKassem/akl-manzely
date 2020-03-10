const INITIAL_STATE = {genders : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getGenders':{
            return {
                genders        : action.payload.data,
                loader       : !!action.payload.success
            };
        }
        default:
            return state;
    }
};
