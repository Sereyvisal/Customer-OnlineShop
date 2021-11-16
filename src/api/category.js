import request from '../utils/request';

export function listCategory(data) {
    return request({
        url: '/category/list',
        method: 'post',
        data: data
    })
}

export function upsertCategory(data) {
    return request({
        url: '/category/upsert',
        method: 'post',
        data: data
    })
}

export function deleteCategory(id) {
    return request({
        url: '/category/delete/' + id,
        method: 'delete'
    })
}