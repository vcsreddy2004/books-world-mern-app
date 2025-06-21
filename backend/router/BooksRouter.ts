import express from "express";
import AuthLogin from "../middleWare/auth";
import Book from "../models/books/Book";
import { IBook } from "../models/books/IBook";
import { BookView } from "../models/books/bookView";
const BookRouter:express.Router = express.Router();
BookRouter.get("/get-all",AuthLogin, async (req, res) => {
    let page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || 5;
    try {
        let books: IBook[] = await Book.find().skip((page - 1) * limit).limit(limit);
        return res.status(200).json(books);
    } 
    catch (error) {
        return res.status(500).json({ errorMessage: "Failed to retrieve books" });
    }
});
BookRouter.get("/:id",AuthLogin, async (req, res) => {
    try {
        let book:IBook | null = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ errorMessage: "Book not found" });
        return res.status(200).json(book);
    } 
    catch (error) {
        return res.status(500).json({ errorMessage: "Error retrieving book" });
    }
});
BookRouter.post("/upload", AuthLogin, async (req, res) => {
    let user = req.body.user;
    let bookData:BookView = {
        title:req.body.title,
        author:req.body.author,
        description:req.body.description,
        publishedYear:req.body.publishedYear,
        errorMessage:"",
    }
    try {
        if(user.isAdmin) {
            const newBook = new Book(bookData);
            const savedBook = await newBook.save();
            return res.status(201).json(savedBook);
        }
        else {
            bookData = {} as BookView;
            bookData.errorMessage = "you have no access to this service";
            return res.status(401).json(bookData);
        }
    } 
    catch (error) {
        return res.status(500).json({ errorMessage: "Failed to add book",error:error });
    }
});

export default BookRouter;
