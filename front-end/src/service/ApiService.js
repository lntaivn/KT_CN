import axios from "axios";

const GetNewViEn = () => {

    return axios.get(`${process.env.REACT_APP_API_DOMAIN}`);
};

const GetNewViEnById = (id) => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/${id}`);
};

const get5LatestNews = () => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/get5LatestNews`);
};

const getTop5ViewCount = () => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/getTop5ViewCount`);
};

const getTop5RelatedCategory = (id) => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/getTop5RelatedCategory/${id}`);
};

const GetAllCategories = () => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/categories`);
};

const SaveDataNewViEn = (
    id_category,
    title_en,
    title_vi,
    content_en,
    content_vi,
    thumbnail
) => {
    const data = {
        id_category: id_category,
        title_en: title_en,
        title_vi: title_vi,
        content_en: content_en,
        content_vi: content_vi,
        view_count: 0,
        thumbnail: thumbnail,
    };
    console.log(data);
    return axios.post(`${process.env.REACT_APP_API_DOMAIN}`, data,{ withCredentials: true });
};
const ListNews = () => {
    
    // const storedToken = sessionStorage.getItem('token');
    // const token = storedToken ? JSON.parse(storedToken) : null;
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/admin/news`,
        {
            withCredentials: true
        });
};

const GetNewCanUpdate = (id) => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/${id}`);
};

const updateViewCount = (id) => {
    return axios.put(`${process.env.REACT_APP_API_DOMAIN}/updateViewCount/${id}`);
};

const PutNewsByID = (
    id,
    id_category,
    title_en,
    title_vi,
    content_en,
    content_vi,
    view_count,
    thumbnail
) => {
    const data = {
        id_category: id_category,
        title_en: title_en,
        title_vi: title_vi,
        content_en: content_en,
        content_vi: content_vi,
        view_count: view_count,
        thumbnail: thumbnail,
    };
    console.log("data", data);
    return axios.put(`${process.env.REACT_APP_API_DOMAIN}/${id}`, data,{ withCredentials: true });
};

const UpdateStatusVi = (id) => {
    return axios.put(`${process.env.REACT_APP_API_DOMAIN}/update-status-vi/${id}`,{
        withCredentials: true
    });
};
const UpdateStatusEn = (id) => {
    return axios.put(`${process.env.REACT_APP_API_DOMAIN}/update-status-en/${id}`,{
        withCredentials: true
    });
};

const UpdateStatuses = (data) => {
    
    return axios.put(`${process.env.REACT_APP_API_DOMAIN}/UpdateStatuses`, data, {
        withCredentials: true
    });
}

export {
    GetNewViEn,
    GetNewViEnById,
    getTop5RelatedCategory,
    getTop5ViewCount,
    get5LatestNews,
    GetAllCategories,
    SaveDataNewViEn,
    ListNews,
    GetNewCanUpdate,
    PutNewsByID,
    UpdateStatusVi,
    UpdateStatusEn,
    updateViewCount,
    UpdateStatuses
};

// CreateUser, GetAllUser, GetUserById
// const CreateUser = (name, email) => {
//     const data = new FormData();

//     data.append("name", name);
//     data.append("email", email);

//     return axios.post("${process.env.REACT_APP_API_DOMAIN}/users", data);
// };

// const GetAllUser = () => {
//     return axios.get("${process.env.REACT_APP_API_DOMAIN}/users");
// };

// const GetUserById = (id) => {
//     return axios.get(`${process.env.REACT_APP_API_DOMAIN}/users/${id}`);
// };
