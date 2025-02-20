import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase"; // Ensure the correct import path

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            const ref = collection(firestore, "details");
            const querySnapshot = await getDocs(ref);
            const items = querySnapshot.docs.map(doc => doc.data().details);
            setCartItems(items);
            setLoading(false);
        };

        fetchCartItems();
    }, []);

    return (
        <div>
            <h1>Cart Page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : cartItems.length === 0 ? (
                <p>Empty Cart</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            <strong>Field 1:</strong> {item.Place} <br />
                            <strong>Field 2:</strong> {item.Product} <br />
                            <strong>Field 3:</strong> {item.Quantity}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartPage;
