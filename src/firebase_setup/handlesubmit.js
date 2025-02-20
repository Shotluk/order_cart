import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "./firebase"; // Ensure the path is correct

const handleSubmit = async (details) => {
    const ref = collection(firestore, "details");

    // Check if the entry already exists
    const q = query(ref, where("details", "==", details)); 
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        console.log("Entry already exists in the database");
        return;
    }

    try {
        await addDoc(ref, { details }); // Store the object inside Firestore
        console.log("Data added successfully");
    } catch (err) {
        console.error("Error adding data:", err);
    }
};

export default handleSubmit;
