const INITIAL_STATE = { banners : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getBanners':
            return {
                banners: action.payload.data,
                loader: !!action.payload.success
            };
        default:
            return state;
    }
};
