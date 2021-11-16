const TokenKey = 'TA-K' // Token Auth Key
const UserIdKey = 'UA-K'
const OrderDetailKey = 'OD-K'

export function getToken() {
    return localStorage.getItem(TokenKey)
}

export function setLocalToken(token) {
    localStorage.setItem(TokenKey, token)
}

export function removeToken() {
    localStorage.removeItem(TokenKey)
}

export function getUserId() {
    return localStorage.getItem(UserIdKey)
}

export function setUserId(id) {
    localStorage.setItem(UserIdKey, id)
}

export function removeUserId() {
    localStorage.removeItem(UserIdKey)
}

export function getOrderDetail() {
    return localStorage.getItem(OrderDetailKey)
}

export function setOrderDetail(id) {
    localStorage.setItem(OrderDetailKey, id)
}

export function removeOrderDetail() {
    localStorage.removeItem(OrderDetailKey)
}