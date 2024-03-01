import axios from "axios";

const GetNewViEn = () => {
    return axios.get(`http://127.0.0.1:8000/api/new-vi-en`);
};

const GetNewViEnById = (id) => {
    return axios.get(`http://127.0.0.1:8000/api/new-vi-en/${id}`);
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

const SaveDataNewViEn = (id_category, title_en, title_vi, content_en, content_vi, thumbnail) => {
    const data = { 
        id_user: 1,
        id_category: id_category,
        title_en: title_en,
        title_vi: title_vi,
        content_en: content_en,
        content_vi: content_vi,
        view_count: 1000,
        thumbnail: thumbnail
    };
    console.log(data);
    return axios.post(`http://127.0.0.1:8000/api/new-vi-en`, data);
}
const ListNews = () => {
    return axios.get(`http://127.0.0.1:8000/api/news`);
};

const GetNewCanUpdate = (id) => {
    return axios.get(`http://127.0.0.1:8000/api/new-vi-en/${id}`);

}
export { 
        GetNewViEn, GetNewViEnById, 
        getTop5RelatedCategory, getTop5ViewCount, get5LatestNews,
        GetAllCategories,
        SaveDataNewViEn,
        ListNews,GetNewCanUpdate
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
    
