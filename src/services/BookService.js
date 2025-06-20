import axios from "axios";
const API = axios.create({baseURL:`${process.env.REACT_APP_BACKEND_URL}`,withCredentials: true});
API.defaults.headers.post["Content-Type"] = "application/json";
class BookService {
    static getAll(page,limit) {
        return API.get(`/api/books/get-all?page=${page}&limit=${limit}`,{});
    }
    static getBook(bookID) {
        return API.get(`api/books/${bookID}`,{});
    }
    static uplood(bookData) {
        return API.post("/api/books/upload",bookData);
    }
}
export default BookService;