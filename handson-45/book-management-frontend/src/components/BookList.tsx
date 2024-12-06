import React, { useEffect, useState } from "react";
import { Book } from "../models/Book";
import { getBooks, deleteBook, updateBook } from "../services/bookService";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]); // Store the list of books
  const [editingBook, setEditingBook] = useState<Book | null>(null); // Track which book is being edited

  // Fetch books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
    };
    fetchBooks();
  }, []);

  // Handle deleting a book
  const handleDelete = async (id: number) => {
    await deleteBook(id);
    setBooks(books.filter((book) => book.id !== id)); // Remove the book from the state
  };

  // Handle editing a book
  const handleEdit = (book: Book) => {
    setEditingBook(book); // Set the selected book for editing
  };

  // Handle saving updates to a book
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      await updateBook(editingBook.id, editingBook); // Call update service
      setBooks(
        books.map((book) =>
          book.id === editingBook.id ? editingBook : book
        )
      );
      setEditingBook(null); // Clear editing state
    }
  };

  // Handle input changes in the editing form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingBook) {
      const { name, value } = e.target;
      setEditingBook({
        ...editingBook,
        [name]: value,
      });
    }
  };
  
  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {editingBook?.id === book.id ? (
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="title"
                  value={editingBook.title}
                  onChange={handleInputChange}
                  placeholder="Book Title"
                />
                <input
                  type="text"
                  name="author"
                  value={editingBook.author}
                  onChange={handleInputChange}
                  placeholder="Author"
                />
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => setEditingBook(null)} // Cancel edit
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                {book.title} by {book.author}
                <button onClick={() => handleEdit(book)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
