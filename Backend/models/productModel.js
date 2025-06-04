const db= require('../config/connect_DB');
// Get all products
const getAllProducts = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        return rows;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

const getProductByName = async (name) => {
    try {
        const [rows] = await db.query('SELECT * FROM products WHERE name LIKE ?', [`%${name}%`]);
        return rows;
    } catch (error) {
        console.error('Error fetching products by name:', error);
        throw error;
    }
};

//getProductsByCategory
const getProductsByCategory=async(category)=>{
    try {
        const [rows]= await db.query('SELECT * FROM products WHERE category LIKE ?', [`%${category}%`]);
        return rows;
        
    } catch (error) {
        console.log(error("error fetching products by category:",error));
        
    }
}

// create a product
const createProduct = async (productData) => {
    const { name, description, price, stock, image_url, category } = productData;
    const [result] = await db.query(
        `INSERT INTO products (name, description, price, stock, image_url, category) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, description, price, stock, image_url, category]
    );
    return { id: result.insertId, ...productData };
};
const deleteProduct = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};
const updateProduct = async (id, updateFields) => {
    try {
        const keys = Object.keys(updateFields);
        const values = Object.values(updateFields);

        if (keys.length === 0) {
            throw new Error("No fields provided for update.");
        }

        const setClause = keys.map(key => `${key} = ?`).join(', ');
        const sql = `UPDATE products SET ${setClause} WHERE id = ?`;

        values.push(id); // Add product ID for WHERE clause

        const [result] = await db.query(sql, values);
        return result;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

const deleteAllProducts = async (req, res) => {
    try {
        const result = await products.deleteAllProducts();

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No products to delete" });
        }

        res.status(200).json({ message: "All products deleted successfully" });
    } catch (error) {
        console.error("Error deleting all products:", error);
        res.status(500).json({ error: "Error deleting all products" });
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

