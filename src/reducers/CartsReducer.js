const INITIAL_STATE = { carts : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCarts':
            return {
                carts: action.payload.data,
                loader: !!action.payload.success
            };
        default:
            return state;
    }
};
