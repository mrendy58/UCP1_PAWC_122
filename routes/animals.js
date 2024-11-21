const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET: Daftar hewan
router.get("/", (req, res) => {
    db.query("SELECT * FROM animals", (err, results) => {
        if (err) return res.status(500).send("Internal Server Error");
        res.render("animals", { title: "Animals List", animals: results });
    });
});

// GET: Form untuk menambah hewan
router.get("/add", (req, res) => {
    res.render("add-animal", { title: "Add Animal" });
});

// POST: Menambah hewan
router.post("/add", (req, res) => {
    const { name, species, age, habitat } = req.body;
    db.query("INSERT INTO animals (name, species, age, habitat) VALUES (?, ?, ?, ?)", [name, species, age, habitat], (err) => {
        if (err) return res.status(500).send("Internal Server Error");
        res.redirect("/animals");
    });
});

// GET: Form untuk mengedit hewan
router.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM animals WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).send("Internal Server Error");
        if (results.length === 0) return res.status(404).send("Animal not found");
        res.render("edit-animal", { title: "Edit Animal", animal: results[0] });
    });
});

// POST: Mengupdate hewan
router.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const { name, species, age, habitat } = req.body; // Ambil age dan habitat dari body
    db.query("UPDATE animals SET name = ?, species = ?, age = ?, habitat = ? WHERE id = ?", [name, species, age, habitat, id], (err) => {
        if (err) return res.status(500).send("Internal Server Error");
        res.redirect("/animals");
    });
});

// POST: Menghapus hewan
router.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM animals WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).send("Internal Server Error");
        res.redirect("/animals");
    });
});

module.exports = router;