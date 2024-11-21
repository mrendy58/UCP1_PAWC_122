const express = require("express");
const bodyParser = require("body-parser"); // Tambahkan ini
const app = express();
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.use(expressLayouts); // Aktifkan layout
app.set("layout", "layouts/main-layout"); // Tetapkan layout utama

app.use(express.static("public")); // Folder untuk file statis

// Middleware untuk menguraikan data dari form
app.use(bodyParser.urlencoded({ extended: true })); // Tambahkan ini
// atau gunakan
// app.use(express.urlencoded({ extended: true })); // Alternatif tanpa body-parser

// Routes
const animalRoutes = require("./routes/animals");
app.use("/animals", animalRoutes);

// Halaman utama
app.get("/", (req, res) => {
    res.render("index", { title: "Zoo Management" });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));