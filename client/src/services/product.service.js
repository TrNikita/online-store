import httpService from './http.service';
import localStorageService from './localStorage.service';
const productEndpoint = 'product/';

const productService = {
    get: async () => {
        const {data} = await httpService.get(productEndpoint);
        return data;
    },
    create: async (payload) => {
        const {data} = await httpService.post(productEndpoint, payload);
        return data;
    },
    update: async (payload) => {
        const {data} = await httpService.patch(
            productEndpoint + localStorageService.getUserId(),
            payload,
        );
        return data;
    },
    remove: async (productId) => {
        const {data} = await httpService.delete(productEndpoint + productId);
        return data;
    },
};
export default productService;
