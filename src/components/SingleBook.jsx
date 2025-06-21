import { useEffect, useState } from "react"
import BookService from "./../services/BookService";
import { useNavigate, useParams } from "react-router-dom";
import ReviewService from "../services/ReviewService";
export default function SingleBook() {
  const [book,setBook] = useState({});
  const {bookId} = useParams();
  const navigator = useNavigate();
  const [review, setReview] = useState({ bookId: bookId, rating: 0, comment: "" });
  const [reviewsList,setReviewsList] = useState([]);  
  useEffect(()=>{ 
    BookService.getBook(bookId).then((res)=>{
      setBook(res.data);
    }).catch(()=>{
      alert("Wrong URL");
      navigator("/");
    }); 
    ReviewService.getAll(bookId).then((res)=>{
      setReviewsList(res.data);
    }).catch((err)=>{
      alert(err);
    })
  },[navigator,bookId]);
  const submitReview = () => {
    ReviewService.uplood(review).then((res)=>{
      window.location.reload();
    }).catch((err)=>{
      alert("Fail to post responce");
    });
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-600 to-green-800 p-8 flex items-center justify-center">
      <div className="bg-white/90 rounded-3xl shadow-2xl flex w-full max-w-5xl overflow-hidden">
        <div className="w-1/3 p-8 flex flex-col justify-center bg-green-700 text-white">
          <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
          <p className="mb-2 text-lg">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="mb-2 text-lg">
            <span className="font-semibold">Published:</span> {book.publishedYear}
          </p>
          <p className="mt-4 text-base">{book.description}</p>
        </div>
        <div className="w-2/3 p-10 flex flex-col bg-white">
          <h3 className="text-2xl font-bold text-green-800 mb-6 border-b-2 border-green-200 pb-2">Reviews</h3>
          <div className="space-y-4 mb-8">
            {reviewsList.map((item, idx) => (
              <div key={item._id || idx} className="bg-green-100 border-l-4 border-green-600 p-5 rounded-lg shadow">
                <p className="text-green-900 font-medium">{item.comment}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <textarea
              className={`border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400`}
              rows={3}
              placeholder="Write your review..."
              value={review.comment}
              onChange={e => setReview((prev)=>({...prev,comment:e.target.value}))}
            />
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} type="button"onClick={() => setReview((prev)=>({...prev,rating:star}))} className="focus:outline-none">
                  <span className={`text-2xl ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}>
                    ★
                  </span>
                </button>
              ))}
              <span className="ml-2 text-green-700 font-medium">{review.rating} / 5</span>
            </div>
            <button type="button" onClick={submitReview} className="bg-green-600 hover:cursor-pointer hover:bg-green-700 text-white font-bold py-2 px-6 disabled:cursor-no-drop disabled:bg-green-950 rounded-lg transition" disabled={!review.comment || review.rating === 0}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
