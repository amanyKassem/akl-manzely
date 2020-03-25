const INITIAL_STATE = { orders : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getOrders':
            return {
                orders: action.payload.data,
                loader: !!action.payload.success
            };
        default:
            return state;
    }
};
