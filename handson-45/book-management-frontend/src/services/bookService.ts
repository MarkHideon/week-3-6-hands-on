// services/bookService.ts
import axios from 'axios';
import { Book } from '../models/Book';

const API_URL = 'http://localhost:5000/api/books';

// Fetch all books
export const getBooks = async (): Promise<Book[]> => {
  const response = await axios.get<Book[]>(API_URL);  // Specify Book[] as the expected response type
  return response.data;
};

// Add a new book
export const addBook = async (book: Book): Promise<Book> => {
  const response = await axios.post<Book>(API_URL, book);  // Specify Book as the expected response type
  return response.data;
};

// Update an existing book
export const updateBook = async (id: number, book: Book): Promise<Book> => {
  const response = await axios.put<Book>(`${API_URL}/${id}`, book);  // Specify Book as the expected response type
  return response.data;
};

// Delete a book
export const deleteBook = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
