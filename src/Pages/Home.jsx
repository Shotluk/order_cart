import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Container 
            className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
        >
            <h1 className="mb-4">Welcome to Our Store</h1>
            <Button 
                variant="primary" 
                size="lg" 
                className="mb-3 w-50"
                onClick={() => navigate("/order")}
            >
                Go to Ordering Page
            </Button>
            <Button 
                variant="success" 
                size="lg" 
                className="w-50"
                onClick={() => navigate("/cart")}
            >
                Go to Cart Page
            </Button>
        </Container>
    );
};

export default HomePage;
