import axios from "axios";

const CreateUser = (name, email) => {
    const data = new FormData();

    data.append("name", name);
    data.append("email", email);

    return axios.post("http://127.0.0.1:8000/api/users", data);
};

const GetAllUser = () => {
    return axios.get("http://127.0.0.1:8000/api/users");
};

const GetUserById = (id) => {
    return axios.get(`http://127.0.0.1:8000/api/users/${id}`);
};

const GetNewViEn = (lang) => {
    const data = { lang: lang };
    console.log("nn :", data);
    return axios.get(`http://127.0.0.1:8000/api/new-vi-en`, { params: data });
};

const GetNewViEnById = (lang, id) => {
    const data = { lang: lang };
    console.log("GetNewViEnById :", data);
    console.log("id :", id);
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

const getTop5RelatedCategory = (lang, id, id_category) => {
    const data = { 
        id_news: id,
        id_category: id_category,
        lang: lang 
    };
    return axios.get(`http://127.0.0.1:8000/api/getTop5RelatedCategory/`, {
        params: data,
    });
};

export { CreateUser, GetAllUser, GetUserById, 
        GetNewViEn, GetNewViEnById, 
        getTop5RelatedCategory, getTop5ViewCount, get5LatestNews
    };
