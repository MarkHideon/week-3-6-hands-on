import express from "express";
import bodyParser from "body-parser";
import bookRoutes from "./routes/books";

const app = express();
const PORT = 3000;

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
