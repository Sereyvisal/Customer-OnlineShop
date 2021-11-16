import request from '../utils/request';

// export function listCompanyInfo(data) {
//     return request({
//         url: '/companyinfo/list',
//         method: 'post',
//         data: data
//     })
// }

export function upsertCompanyInfo(data) {
    return request({
        url: '/companyinfo/upsert',
        method: 'post',
        data: data
    })
}

export function getCompanyInfo() {
    return request({
        url: `/companyinfo`,
        method: 'get',
    });
}

// export function deleteCompanyInfo(id) {
//     return request({
//         url: '/companyinfo/delete/' + id,
//         method: 'delete'
//     })
// }