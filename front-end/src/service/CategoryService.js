import { axiosInstance } from "./AxiosCofig";

const getAllCategories = () => {
    return axiosInstance.get(`/admin/categories`);
};

const postSaveCategory = (data) => {
    return axiosInstance.post(`/admin/category`,data);
};


const updateCategory = (id, data) => {
    return axiosInstance.put(`/admin/category/${id}`,data);
};

const getCategoryByID = (id) => {
    return axiosInstance.get(`/admin/category/${id}`);
};
export { getAllCategories, postSaveCategory, updateCategory, getCategoryByID};


