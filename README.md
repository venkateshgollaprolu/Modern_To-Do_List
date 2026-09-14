# 📝 Modern To-Do List

A modern, responsive, and user-friendly To-Do List web application built using HTML, CSS, and JavaScript.

The application allows users to create, edit, complete, search, filter, prioritize, and delete tasks while automatically saving task data using browser LocalStorage.

## 🌐 Live Demo

👉 https://venkateshgollaprolu.github.io/modern-todo-list/

## 📌 Project Overview

Modern To-Do List is a productivity-focused web application designed to help users organize their daily tasks in a simple and intuitive interface.

The project was developed as a practical frontend development project to strengthen my understanding of:

- HTML5
- CSS3
- JavaScript
- DOM Manipulation
- Event Handling
- LocalStorage
- Responsive Web Design
- UI/UX Design
- Client-side application state management

## ✨ Features

### 📋 Task Management

- Create new tasks
- Edit existing tasks
- Mark tasks as completed
- Mark completed tasks as active
- Delete individual tasks
- Clear all completed tasks

### 🎯 Task Priority

Tasks can be assigned one of three priority levels:

- 🟢 Low
- 🟡 Medium
- 🔴 High

The application also provides a High Priority filter for quickly finding important active tasks.

### 📅 Due Dates

Tasks can have a due date.

The application automatically identifies:

- 📅 Today
- 📅 Tomorrow
- 📅 Upcoming
- ⚠️ Overdue

Completed tasks no longer display their due-date status.

### 🔎 Search

Users can search tasks by title using the built-in search field.

Search is case-insensitive and works together with the task filters.

### 🔍 Task Filters

Tasks can be filtered by:

- All
- Active
- Completed
- High Priority

### 📊 Productivity Statistics

The dashboard displays:

- Total Tasks
- Active Tasks
- Completed Tasks
- High Priority Tasks

Statistics update automatically whenever task data changes.

### 💾 LocalStorage

Task data is stored in the browser using JavaScript LocalStorage.

This allows tasks to remain available after refreshing or reopening the application in the same browser environment.

### 👋 Dynamic Greeting

The application automatically displays a greeting based on the current time:

- Good Morning
- Good Afternoon
- Good Evening
- Good Night

The current date is also generated dynamically.

### 📱 Responsive Design

The interface is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile devices

The layout automatically adapts to smaller screen sizes.

### ♿ Accessibility Considerations

The project includes several accessibility-focused improvements:

- Semantic HTML elements
- ARIA labels
- Keyboard focus states
- Keyboard Escape support for the modal
- Button-based interactive controls
- Descriptive task action labels

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Application structure |
| CSS3 | Styling, layout, animations and responsive design |
| JavaScript | Application logic and interactivity |
| LocalStorage API | Persistent task storage |
| GitHub | Source code hosting |
| GitHub Pages | Application deployment |

## 📂 Project Structure

```text
modern-todo-list/
│
├── index.html
├── style.css
├── script.js
└── README.md
