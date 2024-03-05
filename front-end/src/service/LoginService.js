import axios from "axios";

const postToken = (email) => {
    const data = {
        email: email,
    };

    return axios.post(`${process.env.REACT_APP_API_DOMAIN}/login`, data, { withCredentials: true });
};

const logoutToken = () => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/logout`, { withCredentials: true });
};

const getCurrentUser = () => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/getCurrentUser`, { withCredentials: true });
};

export { postToken, logoutToken, getCurrentUser }