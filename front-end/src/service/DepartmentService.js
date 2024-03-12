import { axiosInstance } from "./AxiosCofig";
const getAllDepartments = ()=>{
    return axiosInstance.get(`/department`);
}
export { getAllDepartments };
