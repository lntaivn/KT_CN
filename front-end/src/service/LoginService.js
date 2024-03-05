import axios from "axios";

const postToken = (email) => {
    const data = {
        email: email,
    };

    return axios.post(`http://127.0.0.1:8000/api/login`, data, { withCredentials: true });
};

const logoutToken = () => {
    return axios.get(`http://127.0.0.1:8000/api/logout`, { withCredentials: true });
};

const GetUserByToken = () => {
    return axios.get(`http://127.0.0.1:8000/api/GetUserByToken`, { withCredentials: true });
};


export {postToken, logoutToken, GetUserByToken}