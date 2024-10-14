import { insertEmptyProjects } from './insert.js';

// Call the function to insert empty projects
insertEmptyProjects().then(() => {
  console.log('All projects inserted successfully');
}).catch((error) => {
  console.error('Error inserting projects:', error);
});
