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
    console.log("nn :", data);
    console.log("id :", id);
    return axios.get(`http://127.0.0.1:8000/api/new-vi-en/${id}`, { params: data });
};
export { CreateUser, GetAllUser, GetUserById ,GetNewViEn,GetNewViEnById};