import axios from "axios";
import { Book } from "../models/Book";

const API_URL = "http://localhost:5000/books"; // Replace with your actual backend URL

export const getBooks = async (): Promise<Book[]> => {
  const response = await axios.get<Book[]>(API_URL); // Specify the type as `Book[]`
  return response.data; // Ensure response.data matches the `Book[]` type
};

export const addBook = async (newBook: Book): Promise<Book> => {
  const response = await axios.post<Book>(API_URL, newBook);
  return response.data; // Return the added book
};

export const deleteBook = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateBook = async (id: number, book: Book): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, book);
};
