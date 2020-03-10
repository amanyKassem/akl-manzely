const INITIAL_STATE = {countries : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCountries':{
            return {
                countries        : action.payload.data,
                loader       : !!action.payload.success
            };
        }
        default:
            return state;
    }
};
