const INITIAL_STATE = { mealInfo : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    console.log("action.payload.dataoooo" , action)
    switch (action.type) {
        case 'productDetails':
            return {
                mealInfo: action.payload.data,
                loader: !!action.payload.success
            };
        default:
            return state;
    }
};
