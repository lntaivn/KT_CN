import { axiosInstance } from "./AxiosCofig";



const SaveAdmissionNews = (data)=>{
    return axiosInstance.post(`/admin/admission-news`,data);
}

const GetAdmissionNews = (id)=>{
    return axiosInstance.get(`/admission-news/${id}`);
}

const UpdateAdmissionNews = (id, data)=>{
    return axiosInstance.put(`/admin/admission-news/${id}`,data);
}





export { SaveAdmissionNews, GetAdmissionNews, UpdateAdmissionNews};
