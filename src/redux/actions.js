export const SET_COMPANYINFO = 'SET_COMPANYINFO';
export const SET_USERINFO = 'SET_USERINFO';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_CART = 'SET_CART';
// export const SET_ORDERDETAIL = 'SET_ORDERDETAIL';
export const SET_ORDERS = 'SET_ORDERS';
export const SET_CATEGORYLIST = "SET_CATEGORYLIST";

export const setCompanyInfo = companyInfo => dispatch => {
    dispatch({
        type: SET_COMPANYINFO,
        payload: companyInfo
    })
};

export const setUserInfo = userInfo => dispatch => {
    dispatch({
        type: SET_USERINFO,
        payload: userInfo
    })
};

export const setToken = token => dispatch => {
    dispatch({
        type: SET_TOKEN,
        payload: token
    })
};

export const setProducts = products => dispatch => {
    dispatch({
        type: SET_PRODUCTS,
        payload: products
    })
};

export const setCart = cart => dispatch => {
    dispatch({
        type: SET_CART,
        payload: cart
    })
};

// export const setOrderDetail = orderDetail => dispatch => {
//     dispatch({
//         type: SET_ORDERDETAIL,
//         payload: orderDetail
//     })
// };

export const setOrders = orders => dispatch => {
    dispatch({
        type: SET_ORDERS,
        payload: orders
    })
};

export const setCategoryList = categoryList => dispatch => {
    dispatch({
        type: SET_CATEGORYLIST,
        payload: categoryList
    })
};