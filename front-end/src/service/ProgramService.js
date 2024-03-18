import { axiosInstance } from "./AxiosCofig";

const SaveProgramsAll=(data)=>{
    return axiosInstance.post(`/admin/programs`,data);
}
export {
    SaveProgramsAll
};