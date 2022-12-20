import httpService from './http.service';
const basketEndpoint = 'basket/';

const basketService = {
    get: async () => {
        const {data} = await httpService.get(basketEndpoint);
        return data;
    },
    add: async (payload) => {
        console.log('payload', payload);
        const {data} = await httpService.post(basketEndpoint, payload);
        return data;
    },
    remove: async ({products}) => {
        const {data} = await httpService.delete(basketEndpoint + products);
        console.log('data', data);
        return data;
    },
};
export default basketService;
