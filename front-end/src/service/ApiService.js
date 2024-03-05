import axios from "axios";

const GetNewViEn = () => {

    return axios.get(`http://127.0.0.1:8000/api/news`);
};

const GetNewViEnById = (id) => {
    return axios.get(`http://127.0.0.1:8000/api/news/${id}`);
};

const get5LatestNews = () => {
    return axios.get(`http://127.0.0.1:8000/api/get5LatestNews`);
};

const getTop5ViewCount = () => {
    return axios.get(`http://127.0.0.1:8000/api/getTop5ViewCount`);
};

const getTop5RelatedCategory = (id) => {
    return axios.get(`http://127.0.0.1:8000/api/getTop5RelatedCategory/${id}`);
};

const GetAllCategories = () => {
    return axios.get(`http://127.0.0.1:8000/api/categories`);
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
        id_user: 1,
        id_category: id_category,
        title_en: title_en,
        title_vi: title_vi,
        content_en: content_en,
        content_vi: content_vi,
        view_count: 0,
        thumbnail: thumbnail,
    };
    console.log(data);
    return axios.post(`http://127.0.0.1:8000/api/news`, data,{ withCredentials: true });
};
const ListNews = () => {
    
    // const storedToken = sessionStorage.getItem('token');
    // const token = storedToken ? JSON.parse(storedToken) : null;
    return axios.get(`http://127.0.0.1:8000/api/admin/news`,
        {
            withCredentials: true
        });
};

const GetNewCanUpdate = (id) => {
    return axios.get(`http://127.0.0.1:8000/api/news/${id}`);
};

const updateViewCount = (id) => {
    return axios.put(`http://127.0.0.1:8000/api/news/updateViewCount/${id}`);
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
        id_user: 1,
        id_category: id_category,
        title_en: title_en,
        title_vi: title_vi,
        content_en: content_en,
        content_vi: content_vi,
        view_count: view_count,
        thumbnail: thumbnail,
    };
    console.log("data", data);
    return axios.put(`http://127.0.0.1:8000/api/news/${id}`, data,{ withCredentials: true });
};

const UpdateStatusVi = (id) => {
    return axios.put(`http://127.0.0.1:8000/api/news/update-status-vi/${id}`);
};
const UpdateStatusEn = (id) => {
    return axios.put(`http://127.0.0.1:8000/api/news/update-status-en/${id}`);
};

const UpdateStatuses = (data) => {
    return axios.put(`http://127.0.0.1:8000/api/news/UpdateStatuses`, data, {
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
};

// CreateUser, GetAllUser, GetUserById
// const CreateUser = (name, email) => {
//     const data = new FormData();

//     data.append("name", name);
//     data.append("email", email);

//     return axios.post("http://127.0.0.1:8000/api/users", data);
// };

// const GetAllUser = () => {
//     return axios.get("http://127.0.0.1:8000/api/users");
// };

// const GetUserById = (id) => {
//     return axios.get(`http://127.0.0.1:8000/api/users/${id}`);
// };
