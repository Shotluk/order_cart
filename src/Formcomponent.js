import React, { useState } from "react";
import handleSubmit from "./firebase_setup/handlesubmit";

const FormComponent = () => {
    const [Place, setPlace] = useState("");
    const [Product, setProduct] = useState("");
    const [Quantity, setQuantity] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const details = {
            Place,
            Product,
            Quantity
        };

        handleSubmit(details);

        setPlace("");
        setProduct("");
        setQuantity("");
    };

    return (
        <div>
            <h2>Submit Details</h2>
            <form onSubmit={handleFormSubmit}>
                <input 
                    type="text" 
                    placeholder="place" 
                    value={Place} 
                    onChange={(e) => setPlace(e.target.value)} 
                    required
                />
                <input 
                    type="text" 
                    placeholder="product" 
                    value={Product} 
                    onChange={(e) => setProduct(e.target.value)} 
                    required
                />
                <input 
                    type="text" 
                    placeholder="quantity" 
                    value={Quantity} 
                    onChange={(e) => setQuantity(e.target.value)} 
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormComponent;
