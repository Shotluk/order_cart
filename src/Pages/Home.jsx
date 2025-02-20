import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to Our Store</h1>
            <button onClick={() => navigate("/order")}>Go to Ordering Page</button>
            <button onClick={() => navigate("/cart")}>Go to Cart Page</button>
        </div>
    );
};

export default HomePage;
