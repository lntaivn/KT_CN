import { axiosInstance } from "./AxiosCofig";

const getAllMajors =()=>{
    return axiosInstance.get(`/admin/majors`);
}

export {
    getAllMajors
};