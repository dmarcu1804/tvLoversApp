# 🎬 Show Search App

A React + Node.js + Vite application that allows users to search for
films using the **TVMaze API**. Search results are displayed as
interactive cards - clicking a card redirects the user to a dedicated
film page with additional details such as summary, release info, and
cast.

## 📌 Features

   ✔️ Search for films using the TVMaze API\
   ✔️ Display results in responsive, clickable cards\
   ✔️ Navigate to a film details page\
   ✔️ Fetch additional film data via:
   ✔️ Built with **React**, **Node.js**, and **Vite**

## 🚀 Tech Stack

   **Frontend:** React, Vite\
   **Backend:** Node.js\
   **Styling:** CSS

## 📂 Getting Started

### 1. Clone the repository

``` bash
git clone https://github.com/dmarcu1804/tvLoversApp.git
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Run the development server

``` bash
npm run dev
```

## 🧪 Testing

### Run all tests

``` bash
npm test
```

### Show test coverage

``` bash
npm test -- --coverage
```

## 🌐 API Endpoints Used

  Purpose                Endpoint
  ---------------------- -------------------------------------------------
  Get show information   `https://api.tvmaze.com/shows/{id}`
  Get cast information   `https://api.tvmaze.com/shows/{id}/cast`

