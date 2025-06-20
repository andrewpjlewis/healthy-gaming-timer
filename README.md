# healthy-gaming-timer

A desktop and web app to help gamers build healthier habits using Electron, React, and Express.

---

## Getting Started

These instructions will help you set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)  
- npm (comes bundled with Node.js)

---

## Installation & Running the App

1. **Clone the repository:**

   git clone [<your-repo-url>](https://github.com/andrewpjlewis/healthy-gaming-timer.git)
   cd healthy-gaming-timer

2. **Install dependencies in the root directory**

    npm install

3. **Install frontend dependencies**

    cd frontend
    npm install
    cd ..

4. **Install backend dependencies**

    cd backend
    npm install
    cd ..

5. **Start development environment in root**

    npm run dev

## Project Structure

    /frontend — React UI powered by Vite
    /backend — Express API server
    main.js — Electron main process entry point
    preload.js — Electron preload script
    package.json — Root package config managing Electron and scripts