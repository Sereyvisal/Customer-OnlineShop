import request from '../utils/request';

export function listCart(data) {
    return request({
        url: '/cart/list',
        method: 'post',
        data: data
    })
}

export function getCart(id) {
    return request({
        url: `/cart/${id}`,
        method: 'get',
    });
}

export function getCartByCustomer(id) {
    return request({
        url: `/cart/customer/${id}`,
        method: 'get',
    });
}

export function upsertCart(data) {
    return request({
        url: '/cart/upsert',
        method: 'post',
        data: data
    })
}

export function updateCartQty(data) {
    return request({
        url: '/cart/updatecartqty',
        method: 'post',
        data: data
    })
}

export function deleteCart(id) {
    return request({
        url: '/cart/delete/' + id,
        method: 'delete'
    })
}
