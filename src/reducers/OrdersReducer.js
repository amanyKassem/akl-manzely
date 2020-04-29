const INITIAL_STATE = { orders : [], loader : true, data: [] };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getOrders':
            return {
                orders: action.payload.data,
                loader: !!action.payload.success
            };
        case 'setNewOrder':
            return { data: action.payload, loader: !!action.payload.success };
        default:
            return state;
    }
};
