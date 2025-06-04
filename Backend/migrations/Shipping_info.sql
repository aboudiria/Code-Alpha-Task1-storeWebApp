CREATE TABLE shipping_info (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    full_name VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    phone VARCHAR(20)
);
