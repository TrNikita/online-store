import httpService from './http.service';
const categoryEndpoint = 'category/';

const categoryService = {
    get: async () => {
        const {data} = await httpService.get(categoryEndpoint);
        return data;
    },
    create: async (payload) => {
        const {data} = await httpService.post(categoryEndpoint, payload);
        return data;
    },
    remove: async (categoryId) => {
        const {data} = await httpService.delete(categoryEndpoint + categoryId);
        return data;
    },
};
export default categoryService;
