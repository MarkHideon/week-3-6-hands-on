import React, { useState, useEffect } from 'react';
import './App.css';

// Define the Book type
interface Book {
  id: number;
  title: string;
  author: string;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]); // state to store the books
  const [newBook, setNewBook] = useState({ title: '', author: '' }); // state to store new book form data

  // Fetch books when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        const data = await response.json();
        setBooks(data); // Set the fetched books to state
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to add a new book
  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newBook.title || !newBook.author) {
      alert('Please fill in both fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        // Add the new book to the state without refreshing
        const addedBook = await response.json();
        setBooks((prevBooks) => [...prevBooks, addedBook]);
        setNewBook({ title: '', author: '' }); // Clear the form after submission
      } else {
        console.error('Error adding book:', response);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Management</h1>

        {/* Add New Book Form */}
        <form onSubmit={handleAddBook}>
          <h2>Add a New Book:</h2>
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={handleInputChange}
            placeholder="Book Title"
          />
          <input
            type="text"
            name="author"
            value={newBook.author}
            onChange={handleInputChange}
            placeholder="Author"
          />
          <button type="submit">Add Book</button>
        </form>

        {/* Display the list of books */}
        <div>
          <h2>Books List:</h2>
          {books.length > 0 ? (
            <ul>
              {books.map((book) => (
                <li key={book.id}>
                  <strong>{book.title}</strong> by {book.author}
                </li>
              ))}
            </ul>
          ) : (
            <p>No books available</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
