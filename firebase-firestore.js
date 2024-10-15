import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';
import { firebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to submit form data to Firestore
export async function submitFormToFirestore(formData) {
    try {
        const docRef = await addDoc(collection(db, "userInfo"), formData);
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}

// Function to validate form data
export function validateForm(formData) {
    const errors = {};

    if (!formData.name.trim()) {
        errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
        errors.phone = "Phone number is required";
    } else if (!/^\d{7,15}$/.test(formData.phone)) {
        errors.phone = "Phone number is invalid";
    }

    // Add more validations as needed

    return errors;
}
