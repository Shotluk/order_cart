import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase"; // Ensure the correct import path
import { Container, Button, Card, ListGroup, Spinner } from "react-bootstrap";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            const ref = collection(firestore, "details");
            const querySnapshot = await getDocs(ref);

            const items = querySnapshot.docs.map(doc => ({
                id: doc.id,  // Store Firestore document ID
                details: doc.data()
            }));

            setCartItems(items);
            setLoading(false);
        };

        fetchCartItems();
    }, []);

    // Function to delete an entry
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(firestore, "details", id));
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            console.log("Item deleted successfully");
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Cart Page</h1>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : cartItems.length === 0 ? (
                <p className="text-center">Empty Cart</p>
            ) : (
                <div>
                    {cartItems.map(({ id, details }) => (
                        <Card key={id} className="mb-3 shadow">
                            <Card.Body>
                                <Card.Title><strong>Place:</strong> {details.Place}</Card.Title>
                                <ListGroup variant="flush">
                                    {details.Products.map((product, index) => (
                                        <ListGroup.Item key={index}>
                                            <strong>Product:</strong> {product.product} <br />
                                            <strong>Quantity:</strong> {product.quantity}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <Button 
                                    variant="danger" 
                                    className="mt-2"
                                    onClick={() => handleDelete(id)}
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </Container>
    );
};

export default CartPage;
