const INITIAL_STATE = { favorites : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFavorites':
            return {
                favorites: action.payload.data,
                loader: !!action.payload.success
            };
        default:
            return state;
    }
};
