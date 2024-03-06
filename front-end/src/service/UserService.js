import axios from "axios";
import { axiosInstance } from "./AxiosCofig";

const getAllUser = () => {
    return axiosInstance.get(`/admin/users`);
};

const addUser = (email) => {
    const data = {
        email: email
    }
    return axiosInstance.post(`/admin/users`,data);
};

const updateRoleUser = (data) => {
    return axiosInstance.put(`admin/users/role/change`,data);
};

const softDeleteNewsByIds = (data) => {
    return axiosInstance.put(`/admin/news/soft-list/delete`, data);
};

export { getAllUser, addUser, updateRoleUser, softDeleteNewsByIds };