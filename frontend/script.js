/*****************************
 * Backend API Configuration
 *****************************/
const API_URL = "https://localhost:7165/api/Tasks";

let tasks = [];

/*****************************
 * Authentication (UI only)
 *****************************/
function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signupForm").style.display = "none";
}

function signup() {
  alert("Signup is handled on frontend only (demo purpose).");
  showLogin();
}

function login() {
  const username = document.getElementById("loginUsername").value.trim();
  if (!username) {
    alert("الرجاء إدخال اسم المستخدم");
    return;
  }

  document.getElementById("authContainer").style.display = "none";
  document.getElementById("mainContainer").style.display = "block";

  document.getElementById("currentUserName").innerText = username;
  document.getElementById("displayUser").innerText = username;

  loadTasksFromApi();
}

function logout() {
  document.getElementById("authContainer").style.display = "block";
  document.getElementById("mainContainer").style.display = "none";
  tasks = [];
  renderTasks();
}

/*****************************
 * API Integration
 *****************************/
function loadTasksFromApi() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      tasks = data.map(t => ({
        id: t.id,
        title: t.title,
        description: t.description,
        deadline: t.deadline.split("T")[0],
        priority: t.priority,
        status: t.status === 0 ? "ToDo" : "Completed"
      }));
      renderTasks();
    })
    .catch(err => console.error("Error loading tasks:", err));
}

function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const deadline = document.getElementById("deadline").value;
  const priorityText = document.getElementById("priority").value;

  if (!title || !deadline) {
    alert("الرجاء إدخال العنوان والموعد النهائي");
    return;
  }

  const priority =
    priorityText === "High" ? 1 :
    priorityText === "Medium" ? 2 : 3;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
      deadline,
      priority
    })
  })
    .then(() => {
      clearForm();
      loadTasksFromApi();
    })
    .catch(err => console.error("Error adding task:", err));
}

/*****************************
 * UI Rendering
 *****************************/
function renderTasks() {
  const tbody = document.querySelector("#tasksTable tbody");
  tbody.innerHTML = "";

  tasks.forEach((task, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>${task.deadline}</td>
      <td>${task.priority}</td>
      <td>${task.status}</td>
      <td>
        <button onclick="markCompleted(${index})">✅</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  updateDashboard();
}

function updateDashboard() {
  document.getElementById("totalTasks").innerText = tasks.length;
  document.getElementById("completedTasks").innerText =
    tasks.filter(t => t.status === "Completed").length;
  document.getElementById("pendingTasks").innerText =
    tasks.filter(t => t.status === "ToDo").length;
}

/*****************************
 * Optional Operations
 *****************************/
function markCompleted(index) {
  alert("Mark as completed can be extended to API if needed.");
}

function deleteTask(index) {
  const taskId = tasks[index].id;

  fetch(`${API_URL}/${taskId}`, {
    method: "DELETE"
  })
    .then(() => loadTasksFromApi())
    .catch(err => console.error("Error deleting task:", err));
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("deadline").value = "";
}

function exportTasks() {
  let data = tasks
    .map(t => `${t.title} | ${t.description} | ${t.deadline}`)
    .join("\n");

  let blob = new Blob([data], { type: "text/plain" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "tasks.txt";
  a.click();
}
