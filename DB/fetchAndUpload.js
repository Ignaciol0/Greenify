import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fetch from 'node-fetch';
import fs from 'fs/promises';

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

const apiUrl = "https://www.ener2crowd.com/it/progetti/api_getProjects?language=en&projectsType=lending&_=1728916410114";

async function fetchAndUploadProjects() {
    try {
        const apiResponse = await fetch(apiUrl);
        if (!apiResponse.ok) {
            throw new Error(`Failed to fetch data. Status code: ${apiResponse.status}`);
        }

        const apiData = await apiResponse.json();
        const projects = {};

        for (const [index, data] of apiData.results.Projects.entries()) {
            const projectIndex = index + 1;
            const imageUrl = `https://www.ener2crowd.com/en/immagini/progetti/piccola/${data.ImageUrl}`;

            // Download image
            const imageResponse = await fetch(imageUrl);
            if (imageResponse.ok) {
                const imageBuffer = await imageResponse.buffer();
                await fs.writeFile(`project ${projectIndex}.png`, imageBuffer);
                console.log(`Image for Project ${projectIndex} downloaded successfully!`);
            } else {
                console.log(`Failed to fetch image for Project ${projectIndex}. Status code: ${imageResponse.status}`);
            }

            // Prepare project data
            projects[`Project ${projectIndex}`] = {
                title: data.ShortDescription,
                description: data.Category,
                investors: data.InvestorsNumber,
                duration: `${data.Duration} months`,
                annualReturn: `${data.Performance} %`,
                imageUrl: `project ${projectIndex}.png`
            };

            // Upload to Firestore
            const docRef = doc(db, "projects", `Project ${projectIndex}`);
            await setDoc(docRef, projects[`Project ${projectIndex}`]);
            console.log(`Project ${projectIndex} successfully written to Firestore!`);

            if (index === 14) {  // Changed from 15 to 14 because index is zero-based
                break;
            }
        }

        // Write projects to JSON file
        await fs.writeFile('projects.json', JSON.stringify(projects, null, 2));
        console.log('Projects data written to projects.json');

    } catch (error) {
        console.error('Error:', error);
    }
}

fetchAndUploadProjects();
