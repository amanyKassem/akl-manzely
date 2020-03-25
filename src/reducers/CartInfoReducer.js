const INITIAL_STATE = { cartInfo : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCartInfo':
            return {
                cartInfo: action.payload.data,
                loader: !!action.payload.success
            };
        default:
            return state;
    }
};
