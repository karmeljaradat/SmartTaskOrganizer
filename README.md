# SmartTaskOrganizer

## Project Description
Smart Task Organizer is a task management application designed to help users organize and manage their daily tasks efficiently.  
The system allows users to create, edit, delete, and view tasks with attributes such as title, description, deadline, priority, and status.

This project was developed as part of the Software Engineering Lab course and focuses on applying software engineering concepts including RESTful API development, design patterns, version control, and project management using Jira and GitHub.

---

## Technologies Used

### Backend
- ASP.NET Core Web API
- C#
- RESTful services
- Local file storage

### Frontend
- HTML
- CSS
- JavaScript (Vanilla JS)

### Tools
- Git & GitHub
- Jira (Scrum Board, Epics, Tasks)
- Swagger (API Testing)
- SonarQube (Code Quality Analysis)

---

## System Architecture
The system follows a layered architecture to ensure separation of concerns and maintainability:

Client / UI  
REST API (Controllers)  
Service Layer  
Repository Layer  
Local File Storage  

This architecture improves scalability, testability, and code organization.

---

## Design Patterns Used

### Backend
- **Repository Pattern**  
  Separates data access logic from business logic, improving maintainability.
- **Service Layer Pattern**  
  Handles business logic and coordinates between controllers and repositories.
- **Singleton Pattern**  
  Ensures a single instance of shared services or repositories.
- **Factory Method Pattern**  
  Creates objects without exposing creation logic, supporting flexibility and future extensions.

### Frontend
- **Observer Pattern**  
  Implemented using event listeners to react to user actions.
- **Command Pattern**  
  Encapsulates user actions such as adding, deleting, and updating tasks.
- **Strategy Pattern**  
  Used for dynamic task filtering (My Day, This Week, This Month).

---

## REST API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| POST | /api/Tasks | Create a new task |
| GET | /api/Tasks | Retrieve all tasks |
| PUT | /api/Tasks/{id} | Update an existing task |
| DELETE | /api/Tasks/{id} | Delete a task |

---

## Testing
Functional testing was conducted for three main functional requirements:
- Create Task
- Edit Task
- Delete Task

Each requirement includes three test cases covering valid scenarios, error handling, and edge cases.

---

## Code Quality
The backend code was analyzed using SonarQube Community Edition.
The analysis showed:
- Grade A in Security, Reliability, and Maintainability
- No critical bugs or vulnerabilities
- Clean and well-structured code

---

## Project Management

### Jira
- Scrum methodology was applied
- Epics, tasks, and subtasks were created and tracked
- Development progress managed using sprints

### GitHub
- A GitHub repository was created for version control
- Clear and meaningful commit messages were used
- Jira was integrated with GitHub for traceability

---

## How to Run the Project

### Backend
1. Open the backend project in Visual Studio
2. Run the ASP.NET Core Web API
3. Use Swagger to test API endpoints

### Frontend
1. Open `index.html` in a web browser
2. Use the interface to manage tasks

---

## Author
**Karmel Jaradat**  
Software Engineering Lab – 2024/2025  
Palestine Polytechnic University

---

## Conclusion
The Smart Task Organizer project demonstrates the practical application of software engineering principles such as layered architecture, design patterns, RESTful services, and agile project management.  
It provides a clean and modular solution for task management.
