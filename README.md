# a simple crud app

A full-stack blog application built with FastAPI for the backend and Next.js for the frontend, using Supabase as the database.

## Features

*   **Create Posts:** Users can create new blog posts with a title and content.
*   **Read Posts:** All existing blog posts are displayed on the homepage.
*   **Update Posts:** Users can edit the title and content of existing posts.
*   **Delete Posts:** Users can delete existing posts.

## Technologies Used

### Backend
*   **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python 3.7+.
*   **Supabase:** An open-source Firebase alternative providing a PostgreSQL database, authentication, and more.
*   **`python-dotenv`:** For loading environment variables from a `.env` file.
*   **`httpx`:** A fully featured HTTP client for Python.

### Frontend
*   **Next.js:** A React framework for building production-ready applications.
*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.

## Setup Instructions

Follow these steps to get the application up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/matthewtognotti/blog_app.git
cd blog_app
```

### 2. Supabase Configuration

This application uses Supabase for its database.
1.  Go to [Supabase](https://supabase.com/) and create a new project.
2.  In your Supabase project, navigate to `Project Settings` -> `API`.
3.  Copy your `Project URL` and `anon public` key.
4.  Create a `.env` file in the `backend/` directory with the following content, replacing the placeholders with your actual Supabase credentials:

    ```
    SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    SUPABASE_KEY="YOUR_SUPABASE_ANON_PUBLIC_KEY"
    ```
5.  Set up your database table. You'll need a table named `posts` with at least the following columns:
    *   `id` (UUID, Primary Key, Default Value: `gen_random_uuid()`)
    *   `title` (text)
    *   `content` (text)
    *   `created_at` (timestamp with time zone, Default Value: `now()`)

### 3. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

1.  **Create a Python Virtual Environment:**
    ```bash
    python3 -m venv venv
    ```
2.  **Activate the Virtual Environment:**
    *   On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```
    *   On Windows:
        ```bash
        .\venv\Scripts\activate
        ```
3.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
    (You might need to create a `requirements.txt` if it doesn't exist: `pip freeze > requirements.txt`)
4.  **Run the FastAPI Application:**
    ```bash
    uvicorn main:app --reload --port 8000
    ```
    The backend will be running at `http://localhost:8000`.

### 4. Frontend Setup

Open a new terminal and navigate to the `frontend` directory:

```bash
cd frontend
```

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Run the Next.js Development Server:**
    ```bash
    npm run dev
    ```
    The frontend will be running at `http://localhost:3000` (or another port if 3000 is in use).

## Usage

Once both the backend and frontend servers are running:

1.  Open your web browser and go to `http://localhost:3000`.
2.  You can add new posts using the form.
3.  Existing posts will be displayed, and you can edit or delete them using the respective buttons.
