import { SET_COMPANYINFO, SET_USERINFO, SET_PRODUCTS, SET_CART, SET_ORDERS, SET_CATEGORYLIST  } from './actions';
import { getToken } from '../utils/auth';

const initialState = {
    companyInfo: '',
    userInfo: '',
    token: getToken(),
    products: '',
    cart: '',
    categoryList: '',
    // orderDetail: ''
}

function userReducer(state = initialState, action) {
    switch(action.type) {
        case SET_COMPANYINFO:
            return { ...state, companyInfo: action.payload };
        case SET_USERINFO:
            return { ...state, userInfo: action.payload };
        case SET_PRODUCTS:
            return { ...state, products: action.payload };
        case SET_CART:
            return { ...state, cart: action.payload };
        case SET_ORDERS:
            return { ...state, orders: action.payload };
        case SET_CATEGORYLIST:
            return { ...state, categoryList: action.payload };
        // case SET_ORDERDETAIL:
        //     return { ...state, orderDetail: action.payload };
        default: 
            return state;
    }
}

export default userReducer;