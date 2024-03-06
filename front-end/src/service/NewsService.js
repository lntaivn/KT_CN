import axios from "axios";
import { axiosInstance } from "./AxiosCofig";

const getAllNewsForAdmin = () => {
    return axiosInstance.get(`/admin/news`);
};

const getAllNewsHiddenForAdmin = () => {
    return axiosInstance.get(`/admin/news-hidden`);
};

const softDeleteNewsById = (id) => {
    return axiosInstance.put(`/admin/news/softDelete/${id}`);
};

const softDeleteNewsByIds = (data) => {
    return axiosInstance.put(`/admin/news/soft-list/delete`, data);
};

export { getAllNewsForAdmin, getAllNewsHiddenForAdmin, softDeleteNewsById, softDeleteNewsByIds };