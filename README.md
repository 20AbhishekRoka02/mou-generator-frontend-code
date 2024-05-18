# MoU Generator Frontend Documentation

This documentation covers the components used in the frontend of the MoU Generator application, built with Next.js and Tailwind CSS.

## Components Overview

### AuthCheck Component

**Purpose:**  
The `AuthCheck` component ensures that only logged-in users can access certain parts of the application.

**Functionality:**  
- Checks if a user ID is stored in the session storage.
- If a user ID is present, it renders the children components (the rest of the application).
- If no user ID is found, it renders the `RegisterLogin` component for user authentication.

### ProjectSelection Component

**Purpose:**  
The `ProjectSelection` component displays a list of projects and allows users to select projects, specify a start date, and set a duration for a Memorandum of Understanding (MoU).

**Functionality:**  
- Fetches a list of projects from the backend when the component loads.
- Dynamically generates checkboxes for each project, allowing users to select the projects they are interested in.
- Includes form fields for users to input a start date and duration for the MoU.
- Handles form submission, sending the selected project IDs, start date, and duration to the backend.

### RegisterLogin Component

**Purpose:**  
The `RegisterLogin` component provides forms for users to either log in or register.

**Functionality:**  
- **Login Form:** 
  - Allows users to log in using their College ID.
  - On submission, it sends the ID to the backend.
  - Stores the session ID in session storage upon successful login.
  
- **Registration Form:** 
  - Collects user information such as logo, name, address, email, phone, signatory, and preferred signature style.
  - On submission, it sends this data to the backend to register a new user.
  - Handles file uploads for the logo and uses a dropdown for selecting the signature style.

## Main Page Integration (page.js)

**Purpose:**  
Combines the above components to form the main application page.

**Functionality:**  
- Uses the `AuthCheck` component to protect the `ProjectSelection` component.
- Ensures that only authenticated users can access the project selection functionality, redirecting unauthenticated users to the login/registration form.

## Styling

**Tailwind CSS:**  
Tailwind CSS is used throughout the application to provide styling for the components. This ensures a consistent and responsive design.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm run dev
   ```

4. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

## File Structure

- **components/**
  - `AuthCheck.js`: Ensures user authentication.
  - `ProjectSelection.jsx`: Displays and handles project selection.
  - `registerlogin.js`: Handles user registration and login.

- **pages/**
  - `page.js`: Integrates all components to form the main application page.

## Backend Integration

- The frontend interacts with a backend server running on `http://localhost:8000` for user authentication, registration, and project data fetching.
  
  Ensure your backend server is up and running before starting the frontend application.

## Conclusion

This documentation provides an overview of the key components and their functionalities in the MoU Generator application. The use of Next.js and Tailwind CSS ensures a robust and visually appealing user interface, while the structured components ensure a seamless user experience.