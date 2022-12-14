import httpService from './http.service';
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
    remove: async (productId) => {
        const {data} = await httpService.delete(productEndpoint + productId);
        return data;
    },
};
export default productService;
