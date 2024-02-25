To create an editable table with React.js that includes the specified features and uses json-server for data persistence, follow these steps:

Create a React App: Initialize a new React.js project using Create React App.

npx create-react-app editable-table-app
Navigate to Project Directory: Move into the newly created project directory.

cd editable-table-app
Install Dependencies: Install the required dependencies including axios for handling HTTP requests and react-toastify for displaying notifications.

npm install axios react-toastify
Install json-server: Install json-server globally to create a mock REST API for data persistence.

npm install -g json-server
Create a JSON Data File: Create a JSON file to serve as the database for json-server. For example, you can create a file named db.json with initial data.

Start json-server: Run json-server to start the mock API using the db.json file created.

bash

json-server --watch db.json --port 3001
Implement Editable Table Component: Create the Editable Table component with all the specified features including add, edit, delete, sort, and filter functionalities.

Run the Application: Start the React development server to run the application.

npm start
Access the Application: Open your web browser and navigate to the URL provided by the development server, typically http://localhost:3000/.

By following these commands and steps, you should have a fully functional editable table application with React.js, json-server for data persistence, and clear feedback for user actions.
