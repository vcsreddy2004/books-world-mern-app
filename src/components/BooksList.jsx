import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BookService from "../services/BookService";

export default function BooksList() {
  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const [books,setBooks] = useState([]);
  const navigator = useNavigate();
  useEffect(()=>{
    BookService.getAll(page,limit).then((res)=>{
      setBooks(res.data);
    }).catch((err)=>{
      alert("Invalid URL");
      navigator("/");
    })
  },[limit,navigator,page]);
  return (
    <>
      <div className="grid grid-rows-1 grid-cols-5 m-5">
        {books.map((book)=> (
          <>
            <a href={`/books/${book._id}`}>
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
            </a>
          </>
        ))}
      </div>
    </>
  )
}
