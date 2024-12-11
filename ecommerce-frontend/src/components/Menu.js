import React, { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", price: "", description: "" });

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then((res) => setMenuItems(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleInputChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/products", newItem)
            .then((res) => setMenuItems([...menuItems, res.data]))
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h1>Restaurant Menu</h1>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <strong>${item.price}</strong>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={handleInputChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={handleInputChange}
                />
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default Menu;

