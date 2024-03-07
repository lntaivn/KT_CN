import { axiosInstance } from "./AxiosCofig";

const GetAllCategories = () => {
    return axiosInstance.get(`/categories`);
};

export { GetAllCategories };


