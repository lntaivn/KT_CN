import { axiosInstance } from "./AxiosCofig";

const getAllCategories = () => {
    return axiosInstance.get(`/categories`);
};

export { getAllCategories };
