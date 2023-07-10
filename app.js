const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Sample')
    .then(() => console.log("Connected To MongoDB"))
    .catch((error) => console.log(error))

// Create Schema 

const productSchema = new mongoose.Schema({
    name: String,
    desc: String,
    price: Number,
    available: Boolean,
})

// Create Product Model

const Product = new mongoose.model("Product", productSchema);

// Create Products

app.post('/api/product/new', async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
        message: "Product Cteated Successfully",
    })
})

// Read (GET) Products

app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        message: "All Products here.",
        products,
    })
})

// Update Products

app.put('/api/product/:id', async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        product = await Product.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Product Not Found !!"
        })
    }
})

// Delete Product 

app.delete('/api/product/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            mmessage: "Product Deleted Successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Product Not Found",
        })
    }
})

app.listen(4500, () => {
    console.log("Server start on http://localhost:4500");
});
