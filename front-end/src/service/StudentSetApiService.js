
import { axiosInstance } from "./AxiosCofig";

const getSixNewsByIdCategory =(id_category)=>{
    return axiosInstance.get(`/news/category-take-6/${id_category}`);
}

export {
    getSixNewsByIdCategory
};