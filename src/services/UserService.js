import axios from "axios";
const API = axios.create({baseURL:`${process.env.REACT_APP_BACKEND_URL}`,withCredentials: true});
API.defaults.headers.post["Content-Type"] = "application/json";
class UserService {
    static register(data)
    {
        let url = `/api/user/register`;
        return API.post(url,data);
    }
    static login(data)
    {
        let url = `/api/user/login`;
        return API.post(url,data);
    }
    static logOut()
    {
        let url = '/api/user/logout';
        return API.post(url,{});
    }
    static getUserData()
    {
        let url = `/api/user/get-user-data`;
        return API.post(url,{});
    }
}
export default UserService;