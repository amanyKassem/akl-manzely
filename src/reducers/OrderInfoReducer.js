const INITIAL_STATE = { orderInfo : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getOrderInfo':
            return {
                orderInfo: action.payload.data,
                loader: !!action.payload.success
            };
        default:
            return state;
    }
};
