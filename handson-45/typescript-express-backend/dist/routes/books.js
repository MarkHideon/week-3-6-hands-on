"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let books = [
    { id: 1, title: "The Line", author: "Twenty-one Pilot", year: 2024 },
    { id: 2, title: "Enemy", author: "Imagine Dragone", year: 2020 },
];
// Get all books
router.get("/", (req, res) => {
    res.json(books);
});
// Get a book by ID
router.get("/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (book) {
        res.json(book);
    }
    else {
        res.status(404).send("Book not found");
    }
});
// Add a new book
router.post("/", (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(201).json(newBook);
});
// Update a book
router.put("/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (book) {
        const updatedBook = { ...book, ...req.body };
        books = books.map((b) => (b.id === parseInt(req.params.id) ? updatedBook : b));
        res.json(updatedBook);
    }
    else {
        res.status(404).send("Book not found");
    }
});
// Delete a book
router.delete("/:id", (req, res) => {
    const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
    if (bookIndex > -1) {
        books.splice(bookIndex, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send("Book not found");
    }
});
exports.default = router;
