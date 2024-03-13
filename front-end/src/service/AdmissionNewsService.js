import { axiosInstance } from "./AxiosCofig";



const SaveAdmissionNews = (data)=>{
    return axiosInstance.post(`/admin/admission-news`,data);
}

const GetAdmissionNews = (id)=>{
    return axiosInstance.get(`/admission-news/${id}`);
}

export { SaveAdmissionNews, GetAdmissionNews};
