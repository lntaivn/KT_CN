import axios from "axios";

const GetNewViEn = (lang) => {
    const data = { lang: lang };

    return axios.get(`http://127.0.0.1:8000/api/new-vi-en`, { params: data });
};

const GetNewViEnById = (lang, id) => {
    const data = { lang: lang };

    return axios.get(`http://127.0.0.1:8000/api/new-vi-en/${id}`, {
        params: data,
    });
};

const get5LatestNews = (lang) => {
    const data = { lang: lang };

    return axios.get(`http://127.0.0.1:8000/api/get5LatestNews`, {
        params: data,
    });
};


const getTop5ViewCount = (lang) => {
    const data = { lang: lang };
    return axios.get(`http://127.0.0.1:8000/api/getTop5ViewCount`, {
        params: data,
    });
};

const getTop5RelatedCategory = (lang, id) => {
    const data = { 
        lang: lang 
    };
    return axios.get(`http://127.0.0.1:8000/api/getTop5RelatedCategory/${id}`, {
        params: data,
    });
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

const PutNewsByID = (id, id_category, title_en, title_vi, content_en, content_vi, thumbnail) => {
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
    console.log("data",data)
    return axios.put(`http://127.0.0.1:8000/api/new-vi-en/${id}`, data);
}

export { 
        GetNewViEn, GetNewViEnById, 
        getTop5RelatedCategory, getTop5ViewCount, get5LatestNews,
        GetAllCategories,
        SaveDataNewViEn,
        ListNews,GetNewCanUpdate,PutNewsByID
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
    
