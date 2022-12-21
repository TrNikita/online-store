import httpService from './http.service';
const basketEndpoint = 'basket/';

const basketService = {
    get: async () => {
        const {data} = await httpService.get(basketEndpoint);
        return data;
    },
    add: async (payload) => {
        const {data} = await httpService.post(basketEndpoint, payload);
        return data;
    },
    remove: async ({products}) => {
        const {data} = await httpService.delete(basketEndpoint + products);
        return data;
    },
};
export default basketService;
