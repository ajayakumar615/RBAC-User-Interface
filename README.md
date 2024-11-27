# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->

RBAC UI Project

Overview

This project is a Role-Based Access Control (RBAC) User Interface built with React and Material-UI. It allows users to manage roles and their associated permissions dynamically, with data stored in the browser's local storage.

Features

1. Role Management:

Add, edit, and delete roles.
View all roles in a tabular format.

2. Dynamic Permissions:

Assign or modify permissions for roles.
Permissions are displayed clearly for easy understanding.

3. Persistence:

Roles and permissions are stored using browser local storage.

4 .Material-UI Integration:

Styled with Material-UI for a modern and responsive UI.

Technologies

ReactJS: Core library for building the UI.
Material-UI: For component styling and responsiveness.
Local Storage: To store roles and permissions persistently.

Installation

Clone Repository:

bash
Copy code
git clone https://github.com/<your-username>/RBAC-UI-Project.git
cd RBAC-UI-Project

Install Dependencies:
bash
Copy code
npm install

Run the App:
bash
Copy code
npm run dev

Open your browser at http://localhost:5173.

Usage

Add a Role:

Click "Add Role."
Enter role name and assign permissions.
Save to store the role.
Edit a Role:

Click "Edit" next to a role in the table.
Modify the name or permissions.
Save changes.
Delete a Role:

Click "Delete" next to a role in the table.
