import request from '../utils/request';

export function listOrder(data) {
    return request({
        url: '/order/list',
        method: 'post',
        data: data
    })
}

export function upsertOrder(data) {
    return request({
        url: '/order/upsert',
        method: 'post',
        data: data
    })
}

export function updateStatus(data) {
    return request({
        url: '/order/updatestatus',
        method: 'post',
        data: data
    })
}

export function getOrder(id) {
    return request({
        url: `/order/${id}`,
        method: 'get',
    });
}

export function getOrderByCustomer(id) {
    return request({
        url: `/order/customer/${id}`,
        method: 'get',
    });
}

export function deleteOrder(id) {
    return request({
        url: '/order/delete/' + id,
        method: 'delete'
    })
}