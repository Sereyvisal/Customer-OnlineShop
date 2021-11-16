import request from '../utils/request';

export function listInventory(data) {
    return request({
        url: '/inventory/list',
        method: 'post',
        data: data
    })
}

export function getInventory(id) {
    return request({
        url: `/inventory/${id}`,
        method: 'get',
    });
}

export function getInventoryByProductId(id) {
    return request({
        url: `/inventory/product/${id}`,
        method: 'get',
    });
}

export function upsertInventory(data) {
    return request({
        url: '/inventory/upsert',
        method: 'post',
        data: data
    })
}

export function deleteInventory(id) {
    return request({
        url: '/inventory/delete/' + id,
        method: 'delete'
    })
}
