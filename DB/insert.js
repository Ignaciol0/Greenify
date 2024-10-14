// Import Firebase and Firestore functions
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyBY2EBA0KnOYZDjxCwSHBMGcLaFjG6IL4o",
    authDomain: "greenify-e91f0.firebaseapp.com",
    projectId: "greenify-e91f0",
    storageBucket: "greenify-e91f0.appspot.com",
    messagingSenderId: "995349170683",
    appId: "1:995349170683:web:10bc48311fbf4a2710235e",
    measurementId: "G-1FP8G4JTGR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define empty project template
const emptyProjectTemplate = {
  title: "",
  description: "",
  imageUrl: "",
  annualReturn: "",
  investors: 0,  // Only investors field is a number
  duration: ""
};

// Insert empty projects in a loop (Projects 1 to 10)
export async function insertEmptyProjects() {
  for (let i = 1; i <= 10; i++) {
    const docRef = doc(db, "projects", `Project ${i}`);

    // Insert the empty project data into Firestore
    try {
      await setDoc(docRef, emptyProjectTemplate);
      console.log(`Project ${i} successfully written!`);
    } catch (error) {
      console.error(`Error writing document for Project ${i}:`, error);
    }
  }
}
