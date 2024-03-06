import axios from "axios";

const getAllNewsForAdmin = () => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/admin/news`, {
        withCredentials: true,
    });
};

export { getAllNewsForAdmin };