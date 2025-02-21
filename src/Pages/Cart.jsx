import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import { Container, Button, Card, ListGroup, Spinner } from "react-bootstrap";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const ref = collection(firestore, "details");
                const querySnapshot = await getDocs(ref);

                const items = querySnapshot.docs.map(doc => {
                    const rawData = doc.data();
                    console.log("Fetched Data:", rawData); // Debugging

                    return {
                        id: doc.id,
                        details: rawData.details || {} // Unwrap extra nesting
                    };
                });

                setCartItems(items);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            } finally {
                setLoading(false);
            }
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
                    {cartItems.map(({ id, details }) => {
                        console.log("Rendering Details:", details); // Debugging

                        return (
                            <Card key={id} className="mb-3 shadow">
                                <Card.Body>
                                    <Card.Title><strong>Place:</strong> {details?.Place || "Unknown"}</Card.Title>
                                    <ListGroup variant="flush">
                                        {Array.isArray(details?.Products) && details.Products.length > 0 ? (
                                            details.Products.map((productData, index) => (
                                                <ListGroup.Item key={index}>
                                                    <strong>Product:</strong> {productData?.product || "N/A"} <br />
                                                    <strong>Quantity:</strong> {productData?.quantity || "N/A"}
                                                </ListGroup.Item>
                                            ))
                                        ) : (
                                            <ListGroup.Item>No products added</ListGroup.Item>
                                        )}
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
                        );
                    })}
                </div>
            )}
        </Container>
    );
};

export default CartPage;
