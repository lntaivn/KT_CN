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

const getAllNewsAdmissionForAdmin = () =>{
    return axiosInstance.get(`/admin/admission-news`);
}

const softDeleteNewsAdmissionByIds = (data) =>{
    return axiosInstance.put(`/admin/admission-news/soft-list/delete`, data);
}
const UpdateAdmissionStatuses = (data) =>{
    return axiosInstance.put(`/admin/admission-news/update/UpdateStatuses`, data);
}

const UpdateAdmissionStatusVi = (id) =>{
    return axiosInstance.put(`/admin/admission-news/update/status-vi/${id}`);

}
const UpdateAdmissionStatusEn = (id) =>{
    return axiosInstance.put(`/admin/admission-news/update/status-en/${id}`);
}

const getAllAdmissionNewsHiddenForAdmin = () => {
    return axiosInstance.get(`/admin/admission-news-hidden`);
};

export { SaveAdmissionNews, GetAdmissionNews, UpdateAdmissionNews, 
    getAllNewsAdmissionForAdmin, softDeleteNewsAdmissionByIds,
    UpdateAdmissionStatuses,UpdateAdmissionStatusVi, 
    UpdateAdmissionStatusEn, getAllAdmissionNewsHiddenForAdmin
};
