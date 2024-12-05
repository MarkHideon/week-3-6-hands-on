import express from "express";
import bodyParser from "body-parser";
import bookRoutes from "./routes/books";
import cors from 'cors';

const app = express();
const PORT = 5000;
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from the frontend
  }));
// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Book Management API!');
});

app.use("/api/books", bookRoutes);

//Port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
