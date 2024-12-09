"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const books_1 = __importDefault(require("./routes/books"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000' // Allow requests from the frontend
}));
// Middleware
app.use(body_parser_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Book Management API!');
});
app.use("/api/books", books_1.default);
//Port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
exports.default = app;
