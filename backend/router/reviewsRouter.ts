import express from "express";
import AuthLogin from "../middleWare/auth";
import Review from "../models/reviews/Review";
import { reviewView } from "../models/reviews/reviewView";
import { IBook } from "../models/books/IBook";
import Book from "../models/books/Book";

const reviewRouter:express.Router = express.Router();
reviewRouter.get("/get-all",AuthLogin, async (req, res) => {
    const bookId = req.query.bookId as string;
    try {
        if(bookId) {
            const reviews:reviewView[] = await Review.find({ bookId });
            return res.status(200).json(reviews);
        }
        else {
            const reviewData:reviewView = {} as reviewView;
            reviewData.errorMessage = "Invalid URL";
            return res.status(404).json(reviewData);
        }
    } 
    catch (error) {
        res.status(500).json({ errorMessage: "Failed to get reviews" });
    }
});
reviewRouter.post("/upload", AuthLogin, async (req, res) => {
    let review:reviewView = {
        bookId:req.body.bookId,
        rating:req.body.rating,
        comment:req.body.comment,
        reviewer:req.body.user.userName,
        errorMessage:""
    }
    try {
        const bookData:IBook | null = await Book.findById(review.bookId);
        if(bookData) {
            const newReview = new Review(review);
            const savedReview = await newReview.save();
            return res.status(201).json(savedReview);
        }
        else {
            review = {} as reviewView;
            review.errorMessage = "Invalid URL";
            return res.status(404).json(review);        
        }
    } 
    catch (error) {
        return res.status(500).json({ errorMessage: "Failed to submit review" });
    }
});

export default reviewRouter;
