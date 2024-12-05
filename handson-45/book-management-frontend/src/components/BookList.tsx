import React, { useEffect, useState } from 'react';
import { Book } from '../models/Book';
import { getBooks, deleteBook, updateBook } from '../services/bookService';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteBook(id);
    setBooks(books.filter((book) => book.id !== id)); // Update state after deletion
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book); // Set the book to be edited
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      await updateBook(editingBook.id, editingBook); // Call the update service
      setBooks(
        books.map((book) =>
          book.id === editingBook.id ? editingBook : book
        )
      ); // Update the book in the state
      setEditingBook(null); // Clear the editing state
    }
  };

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
                />
                <input
                  type="text"
                  name="author"
                  value={editingBook.author}
                  onChange={handleInputChange}
                />
                <button type="submit">Save</button>
                <button onClick={() => setEditingBook(null)}>Cancel</button>
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
