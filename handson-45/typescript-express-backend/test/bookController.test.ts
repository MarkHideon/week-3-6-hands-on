// __tests__/bookController.test.ts

import request from "supertest";
import app from "../src/app"; // Your Express app
import "jest";

describe("Book Management API", () => {

  let bookId: number;

  // Test GET /api/books - Fetch all books
  it("should fetch all books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array); // Expect the response to be an array of books
    expect(res.body.length).toBeGreaterThan(0); // There should be at least one book
  });

  // Test GET /api/books/:id - Fetch book by ID
  it("should fetch a book by ID", async () => {
    const res = await request(app).get("/api/books/1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1); // Check that the ID is 1
    expect(res.body.title).toBe("The Line"); // Check that the title is correct
  });

  // Test GET /api/books/:id for non-existent book
  it("should return 404 for non-existing book", async () => {
    const res = await request(app).get("/api/books/999");
    expect(res.status).toBe(404);
    expect(res.text).toBe("Book not found");
  });

  // Test POST /api/books - Add a new book
  it("should add a new book", async () => {
    const newBook = {
      title: "New Book",
      author: "New Author",
      year: 2022
    };
    const res = await request(app).post("/api/books").send(newBook);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newBook.title);
    expect(res.body.author).toBe(newBook.author);
    expect(res.body.year).toBe(newBook.year);
    bookId = res.body.id; // Store the ID of the newly created book for future tests
  });

  // Test PUT /api/books/:id - Update an existing book
  it("should update an existing book", async () => {
    const updatedBook = {
      title: "Updated Book Title",
      author: "Updated Author",
      year: 2023
    };
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .send(updatedBook);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedBook.title);
    expect(res.body.author).toBe(updatedBook.author);
    expect(res.body.year).toBe(updatedBook.year);
  });

  // Test DELETE /api/books/:id - Delete a book
  it("should delete a book", async () => {
    const res = await request(app).delete(`/api/books/${bookId}`);
    expect(res.status).toBe(204); // Expect no content, just the status code 204

    // Verify the book is deleted
    const getRes = await request(app).get(`/api/books/${bookId}`);
    expect(getRes.status).toBe(404); // The book should no longer exist
  });

  // Test DELETE for non-existent book
  it("should return 404 when deleting a non-existing book", async () => {
    const res = await request(app).delete("/api/books/999");
    expect(res.status).toBe(404);
    expect(res.text).toBe("Book not found");
  });

});
