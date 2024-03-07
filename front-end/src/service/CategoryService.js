import { axiosInstance } from "./AxiosCofig";

const getAllCategories = () => {
    return axiosInstance.get(`/admin/categories`);
};

const postSaveCategory = (data) => {
    
    return axiosInstance.post(`/admin/category`,data);
};

export { getAllCategories, postSaveCategory};


