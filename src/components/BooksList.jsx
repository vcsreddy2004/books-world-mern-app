import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BookService from "../services/BookService";

export default function BooksList() {
  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const [books,setBooks] = useState([]);
  const navigator = useNavigate();
  const showUploadUI = !limit && !page;
  const [book,setBook] = useState({});
  const [errors,setErrors] = useState({});
  const [nextPageExists, setNextPageExists] = useState(true);
  const fetchData = useCallback(() => {
    BookService.getAll(page, limit).then((res) => {
        setBooks(res.data);
        const nextPage = Number(page) + 1;
        BookService.getAll(nextPage, limit).then((nextRes) => {
          if (!nextRes.data.books || nextRes.data.books.length === 0) {
            setNextPageExists(false);
          } 
          else {
            setNextPageExists(true);
          }
        });
      }).catch(() => {
        alert("Invalid URL");
        navigator("/");
      });
  }, [limit, page, navigator]);
  useEffect(()=>{
    if(!showUploadUI) {
      fetchData();
    }
  },[fetchData,showUploadUI]);
  const updateBook = (e) => {
    setBook(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }));
    setErrors(prev=>({
      ...prev,
      [e.target.name]:false,
    }));
  }
  const addBook = () => {
    const currentError = {};
    if(!book.title || book.title === "") currentError.title = true;
    if(!book.author || book.author === "") currentError.author = true;
    if(!book.publishedYear || book.publishedYear === "") currentError.publishedYear = true;
    if(!book.description || book.description === "") currentError.description = true;
    setErrors(currentError);
    if(Object.keys(currentError).length === 0) {
      BookService.uplood(book).then((res)=>{
        navigator("/Books?page=1&limit=5");
      });
    }
  }
  if(showUploadUI) {
    return (
      <>
      <div className="flex flex-col items-center w-full max-w-lg m-auto justify-center min-h-[60vh] overflow-hidden bg-green-50 border-2 border-green-700 rounded-lg shadow-lg p-4 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 sm:mb-6 text-center">Upload a New Book</h2>
        <form className="w-full bg-white rounded-lg shadow p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div>
            <label className="block text-green-700 font-semibold mb-1 sm:mb-2" htmlFor="title">
              Title
            </label>
            <input type="text" id="title" onChange={updateBook} name="title" placeholder="Book Title" className={`${errors.title? "border border-red-300" : "border border-green-300"} w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400`}/>
          </div>
          <div>
            <label className="block text-green-700 font-semibold mb-1 sm:mb-2" htmlFor="author">
              Author
            </label>
            <input type="text" id="author" onChange={updateBook} name="author" placeholder="Author Name" className={`${errors.author? "border border-red-300" : "border border-green-300"} w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400`}/>
          </div>
          <div>
            <label className="block text-green-700 font-semibold mb-1 sm:mb-2" htmlFor="publishedYear">
              Published Year
            </label>
            <input type="number" id="publishedYear" onChange={updateBook} name="publishedYear" placeholder="e.g. 2024" className={`${errors.publishedYear? "border border-red-300" : "border border-green-300"} w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400`} />
          </div>
          <div>
            <label className="block text-green-700 font-semibold mb-1 sm:mb-2" htmlFor="description">
              Description
            </label>
            <textarea id="description" onChange={updateBook} name="description" rows={3} placeholder="Book Description" className={`${errors.description? "border border-red-300" : "border border-green-300"} w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400`} />
          </div>
          <button type="button" onClick={addBook} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">
            Upload Book
          </button>
        </form>
      </div>
      </>
    );
  }
  return (
    <>
      <div className="flex items-center m-5">
        <Link to={`/Books?page=${page>1?Number(page) - 1 : 1}&limit=5`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" className={`size-12 ${page>1? "hover:cursor-pointer" : "hover:cursor-no-drop"} fill-none stroke-green-700`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </Link>
        <div className="grid grid-rows-1 grid-cols-5 m-5">
          {books.map((book)=> (
            <Link to={`/books/${book._id}`}>
              <div className="shadow-xl m-5" key={book._id}>
                <div>
                  {book.title}
                </div>
                <div>
                  <div>
                    <span>Author</span>: {book.author}
                  </div>
                  <div>
                    <span>Publeshed Year</span>: {book.publishedYear} 
                  </div>
                  <div>
                    {book.description}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link to={nextPageExists ? `/Books?page=${Number(page) + 1}&limit=${limit}` : "#"}  onClick={(e) => {if (!nextPageExists) e.preventDefault();}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" className={`${nextPageExists ? "hover:cursor-pointer" : "hover:cursor-no-drop"} size-12 fill-none stroke-green-700`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </Link>
      </div>
    </>
  )
}
