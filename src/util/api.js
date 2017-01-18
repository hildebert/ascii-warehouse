import axios from 'axios';

const api = (endpoint, params = {}, method = 'GET') => {
    console.log('request start', `/${endpoint}?` + Object.keys(params).map(k => k + '=' + encodeURIComponent(params[k])).join('&'));

    return axios.get(`/${endpoint}`, { params })
        .then(function (response) {
            return JSON.parse(`[${response.data.replace(/(\s*)$/, '').replace(/\n/g, ',')}]`);
        });
};

export default {
    products: (limit = 100, offset = 0) => api('api/products', { limit, offset })
};