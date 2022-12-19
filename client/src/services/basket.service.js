import httpService from './http.service';
import localStorageService from './localStorage.service';
const basketEndpoint = 'basket/';

const basketService = {
    get: async () => {
        const {data} = await httpService.get(basketEndpoint);
        return data;
    },
    create: async (payload) => {
        const {data} = await httpService.post(basketEndpoint, payload);
        return data;
    },
    update: async (payload) => {
        const {data} = await httpService.patch(
            basketEndpoint + localStorageService.getUserId(),
            payload,
        );
        return data;
    },
    remove: async (productId) => {
        const {data} = await httpService.delete(basketEndpoint + productId);
        return data;
    },
};
export default basketService;
