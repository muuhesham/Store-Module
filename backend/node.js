const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 3000;
app.use(express.json());
app.use(bodyParser.json());
const con = require('./db/connection.js');
const knexConfig = require('./knex.js');
const knex = require('knex')(knexConfig.development);


// fetch  the fake data and insert to db
app.get('/fetch_products', async (req, res) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;

        console.log('Fetched Products:', products);

        products.forEach(product => {
            const { id, title, price, description, category, image } = product;
            const query = `
                INSERT INTO product (id, title, price, description, category, image)
                VALUES (?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    title=VALUES(title),
                    price=VALUES(price),
                    description=VALUES(description),
                    category=VALUES(category),
                    image=VALUES(image)
            `;
            con.query(query, [id, title, price, description, category, image], (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                } else {
                    console.log('Inserted/Updated product ID:', id);
                }
            });
        });
        res.status(200).send({ message: 'Products fetched and stored in database' });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

//create
app.post("/products", (req, res) => {
    const { title, price, description, category, image } = req.body;
    const query = "INSERT INTO product (title, price, description, category, image) VALUES (?, ?, ?, ?, ?)";
    con.query(query, [title, price, description, category, image], (err, result) => {
        if (err) {
            console.error("Error inserting product:", err);
        }
        res.status(201).json({ message: "Product created", id: result.insertId });
    });
});

// read
app.get("/products", (req, res) => {
    const query = "SELECT * FROM product";
    con.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ error: "Error fetching products" });
        }
        res.status(200).json(results);
    });
});

// Update
app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { title, price, description, category, image } = req.body;
    const query = "UPDATE product SET title = ?, price = ?, description = ?, category = ?, image = ? WHERE id = ?";
    con.query(query, [title, price, description, category, image, id], (err, result) => {
        if (err) {
            console.error("Error updating product:", err);
            return res.status(500).json({ error: "Error updating product" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated" });
    });
});

// Delete
app.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM product WHERE id = ?";
    con.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error deleting product:", err);
            return res.status(500).json({ error: "Error deleting product" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted" });
    });
});

//create
app.post("/category",(req,res)=>{
    const {name} = req.body;
    const query = "INSERT INTO categories (name) VALUES (?)";
    con.query(query,[name],(err,result)=>{
        if(err){
            console.error("Error create category");
        }
        res.status(201).json({message:"create category done" , id: result.insertId })
    })
})

//read
app.get("/category",(req,res)=>{
    const query = "SELECT * FROM categories";
    con.query(query,(err,result)=>{
        if(err){
            console.error("Error in fetch the data form db");
        }
        res.status(200).json({result});
    })
})

//update
app.put("/category/:id",(req,res)=>{
    const {id}= req.params;
    const {name} = req.body
    const query = "UPDATE categories SET name = ? WHERE id = ?";
    con.query(query,[id],[name],(err,result)=>{
        if(err){
            console.error("Error in update the data");
        }
        if(result.affectedRows === 0){
            res.status(404).json({message:"not found category"})
        }
        res.status(200).json({message:"the category updated"})
    })
})

//delete
app.delete("/category/:id",(req,res)=>{
    const {id} = req.params;
    const query = "DELETE FROM categories WHERE id = ?";
    con.query(query,[id],(err,result)=>{
        if(err){
            console.error("Error in delete the category");
        }
        if(result.affectedRows === 0){
            res.status(404).json({message: "not found category"})
        }
        res.status(200).json({message:"the category deleted"})
    })
})


// Server port
app.listen(port, () => {
    console.log("now i'm on port 3000");
});

module.exports = app;