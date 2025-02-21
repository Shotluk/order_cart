import React, { useState } from "react";
import handleSubmit from "./firebase_setup/handlesubmit";
import { Button, Form, Container } from "react-bootstrap";

const FormComponent = () => {
    const [place, setPlace] = useState("");
    const [products, setProducts] = useState([{ product: "", quantity: "" }]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const details = {
            Place: place,
            Products: products
        };

        handleSubmit(details);

        // Reset form after submission
        setPlace("");
        setProducts([{ product: "", quantity: "" }]);
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
    };

    const addProductField = () => {
        setProducts([...products, { product: "", quantity: "" }]);
    };

    const removeProductField = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Submit Details</h2>
            <Form onSubmit={handleFormSubmit} className="p-4 border rounded shadow">
                <Form.Group className="mb-3">
                    <Form.Label>Place</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter place"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        required
                    />
                </Form.Group>

                {products.map((item, index) => (
                    <div key={index} className="mb-3">
                        <Form.Group className="mb-2">
                            <Form.Label>Product {index + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product"
                                value={item.product}
                                onChange={(e) => handleProductChange(index, "product", e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter quantity"
                                value={item.quantity}
                                onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                                required
                            />
                        </Form.Group>
                        {index > 0 && (
                            <Button 
                                variant="danger" 
                                className="mt-2" 
                                onClick={() => removeProductField(index)}
                            >
                                Remove Product
                            </Button>
                        )}
                    </div>
                ))}

                <Button variant="secondary" className="mt-3" onClick={addProductField}>
                    Add Product
                </Button>

                <Button type="submit" variant="primary" className="mt-3 w-100">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default FormComponent;
