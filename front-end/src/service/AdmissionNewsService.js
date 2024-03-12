import { axiosInstance } from "./AxiosCofig";



const SaveAdmissionNews = (data)=>{
    return axiosInstance.post(`/admin/admission-news`,data);
}
export { SaveAdmissionNews };
