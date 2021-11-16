import axios from 'axios';
// import store from '@/store';
import serverConfig from './serverConfig';
import { meta } from "./enum";
import { useSelector } from 'react-redux';
import { getToken } from './auth';

const service = axios.create({
    baseURL: serverConfig.api_url,
    timeout: 15000
});

service.interceptors.request.use(config => {
    // const { token } = useSelector(state => state.userReducer);
    config.headers['Authorization'] = getToken();
    config.headers['Content-Type'] = 'application/json';

    if (config.method === 'post') {
        config.data = JSON.stringify(config.data);
    }

    return config
}, error => {
    Promise.reject(error)
});

service.interceptors.response.use(
    response => {
        const res = response.data;

        if (res.meta == meta.TOKENEXPIRE) {
            // alert("Token Expire, Please Login Again");
            // store.dispatch('LogOut').then(() => {
            //     location.reload()
            // })
        }
        else {
            return res;
        }


        // if (res.meta !== 0 && res.meta !== 100) {
        //     if (res.meta === 50008 || res.meta === 50012 || res.meta === 50014 || res.meta === 10000) {
        //         store.dispatch('LogOut').then(() => {
        //             location.reload()
        //         })
        //     } else {
        //         const err = new Error(res.error)
        //         err.data = res
        //         err.response = response
        //         throw err
        //     }
        // } else {
        //     return response.data
        // }

        // return { status: response.status, response: response.data };

    },
    error => {
        // return Promise.reject({ status: error.response.status, response: error.response.data })
        return Promise.reject(error.response.data)
    }
);

export default service;