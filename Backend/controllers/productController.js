const products = require('../models/productModel');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const productsList = await products.getAllProducts();
        if (productsList.length === 0) {
            return res.status(404).json({ message: "No products available in the store" });
        }
        res.status(200).json({
            message: 'All available products',
            products: productsList.map(p => ({
                id: p.id,
                name: p.name,
                description: p.description,
                stock: p.stock,
                category: p.category,
                price: p.price,
                image_url: p.image_url
            }))
        });
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        res.status(500).json({ error: "Error getting the products" });
    }
};

// Get product by name
const getProductByName = async (req, res) => {
    try {
        const { productName } = req.body;
        if (!productName || productName.trim() === "") {
            return res.status(400).json({ message: "Product name is required" });
        }

        const productNameList = await products.getProductByName(productName);
        if (productNameList.length === 0) {
            return res.status(404).json({ message: "No products found with that name" });
        }

        res.status(200).json({
            message: "Successfully fetched products by name",
            products: productNameList.map(p => ({
                id: p.id,
                name: p.name,
                stock: p.stock,
                price: p.price,
                category: p.category,
                image_url: p.image_url
            }))
        });
    } catch (error) {
        console.error("Error in getProductByName:", error);
        res.status(500).json({ error: "Error getting the product by name" });
    }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.body;
        if (!category || category.trim() === "") {
            return res.status(400).json({ message: "Category is required" });
        }

        const productsCategoryList = await products.getProductsByCategory(category);
        if (productsCategoryList.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }

        res.status(200).json({
            message: "Successfully fetched products by category",
            products: productsCategoryList.map(p => ({
                category: p.category,
                id: p.id,
                name: p.name,
                description: p.description,
                stock: p.stock,
                price: p.price,
                image_url: p.image_url
            }))
        });
    } catch (error) {
        console.error("Error in getProductsByCategory:", error);
        res.status(500).json({ error: "Error fetching products by category" });
    }
};

// Create product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, image_url } = req.body;

        if (!name || !description || !price || !stock || !category || !image_url) {
            return res.status(400).json({ message: "All fields are required to create a product" });
        }

        const productCreated = await products.createProduct({
            name,
            description,
            price,
            stock,
            category,
            image_url
        });

        res.status(201).json({
            message: "Product created successfully",
            product: productCreated
        });
    } catch (error) {
        console.error("Error in creating product:", error);
        res.status(500).json({ error: "Error in creating product" });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "Valid product ID is required" });
        }

        const result = await products.deleteProduct(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Error deleting product" });
    }
};
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "Valid product ID is required" });
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "At least one field must be provided for update" });
        }

        const result = await products.updateProduct(id, updateFields);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found or no changes made" });
        }

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
};
const deleteAllProducts = async (req, res) => {
    try {
        const result = await productModel.deleteAllProducts();

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No products to delete." });
        }

        return res.status(200).json({ 
            message: "All products deleted successfully.",
            deletedCount: result.affectedRows 
        });
    } catch (error) {
        console.error("Error deleting all products:", error);
        res.status(500).json({ error: "Failed to delete products." });
    }
};


module.exports = {
    getAllProducts,
    getProductByName,
    getProductsByCategory,
    createProduct, 
    deleteProduct, 
    updateProduct,
    deleteAllProducts
};
