import axios from "axios";
const API = axios.create({baseURL:`${process.env.REACT_APP_BACKEND_URL}`,withCredentials: true});
API.defaults.headers.post["Content-Type"] = "application/json";
class ReviewService {
    static getAll(bookID) {
        return API.get(`/api/reviews/get-all?bookId=${bookID}`,{});
    }
    static uplood(bookData) {
        return API.post("/api/reviews/upload",bookData);
    }
}
export default ReviewService;