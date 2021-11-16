import request from '../utils/request';

// ==============product====================== //
export function listProduct(data) {
    return request({
        url: '/product/list',
        method: 'post',
        data: data
    });
}

export function getProduct(id) {
    return request({
        url: `/product/${id}`,
        method: 'get',
    });
}

export function upsertProduct(data) {
    return request({
        url: '/product/upsert',
        method: 'post',
        data: data
    })
}

export function deleteProduct(id) {
    return request({
        url: '/product/delete/' + id,
        method: 'delete'
    })
}

export function listProductAttr(data) {
    return request({
        url: '/productAttr/list',
        method: 'get',
        data: data
    })
}


// ================product item================== //

export function listProductItem(data) {
    return request({
        url: '/productItem/list',
        method: 'post',
        data: data
    })
}

export function upsertProductItem(data) {
    return request({
        url: '/productItem/upsert',
        method: 'post',
        data: data
    })
}

export function getProductItemsByProduct(id) {
    return request({
        url: '/productItem/product/' + id,
        method: 'get'
    })
}

export function deactivateProductItem(id) {
    return request({
        url: '/productItem/deactivate/' + id,
        method: 'delete'
    })
}

export function deleteProductItem(id) {
    return request({
        url: '/productItem/delete/' + id,
        method: 'delete'
    })
}

export function deleteProductItems(data) {
    return request({
        url: 'productItem/delete/productitems',
        method: 'post',
        data: data
    })
}