const db= require('../config/db');

const addShippingDetails = async (orderId, info) => {
    const { full_name, address, city, postal_code, country, phone } = info;
    const sql = 'INSERT INTO shipping_details (order_id, full_name, address, city, postal_code, country, phone) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.execute(sql, [orderId, full_name, address, city, postal_code, country, phone]);
    return result.insertId;
};

const getShippingByOrderId=async (orderId) => {
    const sql = 'SELECT * FROM shipping_details WHERE order_id = ?';
    const [rows] = await db.execute(sql, [orderId]);
    return rows.length > 0 ? rows[0] : null;
};

const updateShippingDetails = async (orderId, updatedData) => {
    const { full_name, address, city, postal_code, country, phone } = updatedData;
    const sql = 'UPDATE shipping_details SET full_name = ?, address = ?, city = ?, postal_code = ?, country = ?, phone = ? WHERE order_id = ?';
    await db.execute(sql, [full_name, address, city, postal_code, country, phone, orderId]);
    return getShippingByOrderId(orderId);
};
const deleteShippingDetails = async (orderId) => {
    const sql = 'DELETE FROM shipping_details WHERE order_id = ?';
    await db.execute(sql, [orderId]);
};
const getAllShippingInfo=async()=>{
    const [rows] = await db.query('SELECT * FROM shipping_info');
    return rows;
};
module.exports = {
    addShippingDetails,
    getShippingByOrderId,
    updateShippingDetails,
    deleteShippingDetails
};
