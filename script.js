
let tasks = [];

// ---- User Authentication ----
function showSignup(){
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
}

function showLogin(){
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";
}

function signup(){
    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if(!username || !password){
        alert("الرجاء ملء جميع الحقول");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if(users.find(u => u.username === username)){
        alert("اسم المستخدم موجود مسبقًا!");
        return;
    }

    users.push({username, password});
    localStorage.setItem("users", JSON.stringify(users));
    alert("تم إنشاء الحساب بنجاح!");
    showLogin();
}

function login(){
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if(!username || !password){
        alert("الرجاء ملء جميع الحقول");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let user = users.find(u => u.username === username && u.password === password);

    if(user){
        alert("تم تسجيل الدخول بنجاح!");
        document.getElementById("authContainer").style.display = "none";
        document.getElementById("mainContainer").style.display = "block";

        // حفظ المستخدم الحالي في localStorage
        localStorage.setItem("currentUser", username);
        document.getElementById("currentUserName").innerText = username;
        document.getElementById("displayUser").innerText = username;

        loadUserTasks();
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
}

function logout(){
    if(confirm("هل تريد تسجيل الخروج؟")){
        localStorage.removeItem("currentUser");
        document.getElementById("authContainer").style.display = "block";
        document.getElementById("mainContainer").style.display = "none";
        tasks = [];
        renderTasks();
    }
}

// ---- Load & Save Tasks Per User ----
function loadUserTasks(){
    const username = localStorage.getItem("currentUser");
    if(!username) return;

    let allTasks = JSON.parse(localStorage.getItem("tasks") || "{}");
    tasks = allTasks[username] || [];
    renderTasks();
}

function saveTasksPerUser(){
    const username = localStorage.getItem("currentUser");
    if(!username) return;

    let allTasks = JSON.parse(localStorage.getItem("tasks") || "{}");
    allTasks[username] = tasks;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
}

// ---- Task Management ----
function updateDashboard() {
    document.getElementById("totalTasks").innerText = tasks.length;
    document.getElementById("completedTasks").innerText = tasks.filter(t => t.status === "Completed").length;
    document.getElementById("pendingTasks").innerText = tasks.filter(t => t.status === "ToDo").length;
}

function addTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;
    const priority = document.getElementById("priority").value;

    if(!title || !deadline){
        alert("الرجاء ملء العنوان والموعد النهائي");
        return;
    }

    const task = {title, description, deadline, priority, status: "ToDo"};
    tasks.push(task);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("deadline").value = "";

    saveTasksPerUser();
    renderTasks();
}

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
                <button onclick="completeTask(${index})">✅ Complete</button>
                <button onclick="deleteTask(${index})">🗑 Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    updateDashboard();
}

function completeTask(index){
    tasks[index].status = "Completed";
    saveTasksPerUser();
    renderTasks();
}

function deleteTask(index){
    tasks.splice(index, 1);
    saveTasksPerUser();
    renderTasks();
}

function clearTasks(){
    if(confirm("هل أنت متأكد من مسح كل المهام؟")){
        tasks = [];
        saveTasksPerUser();
        renderTasks();
    }
}

function exportTasks(){
    let data = tasks.map(t => `${t.title} | ${t.description} | ${t.deadline} | ${t.priority} | ${t.status}`).join("\n");
    let blob = new Blob([data], {type: "text/plain"});
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "tasks.txt";
    a.click();
}
