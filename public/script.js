const toggleBtn = document.getElementById("theme-toggle");

// 1. Load saved theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️";
}

// 2. When button is clicked
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});


const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const task = input.value.trim();
  console.log(task);
  try {
    const response = await fetch("/add-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });
    const data = await response.json();
    // alert(result);
    
    if (data.success) {
    addTaskToScreen(task, data.id);
}

    input.value = ""; 
  } catch (error) {
    console.log("Error:" + error);
    alert("Error occurred!");
  }
});

function addTaskToScreen(name, id) {
  const list = document.getElementById("taskList");

  const li = document.createElement("li");

  li.innerHTML = `
    <input type="checkbox" class="task-check" data-id="${id}" />
    
    <span class="task-text">${name}</span>

    <form action="/delete/${id}" method="get" style="display:inline;">
      <button type="submit" id="del-btn">Remove</button>
    </form>
  `;

  list.appendChild(li);
}

let checkboxes = document.querySelectorAll(".task-check");

document.addEventListener("change", async (e) => {
  function addTaskToScreen(name, id) {
  const list = document.getElementById("taskList");

  const li = document.createElement("li");

  li.innerHTML = `
    <div class="task-left">
      <input type="checkbox" class="task-check" data-id="${id}" />
      <span class="task-text">${name}</span>
    </div>

    <form action="/delete/${id}" method="get" style="display:inline;">
      <button type="submit" id="del-btn">Remove</button>
    </form>
  `;

  list.appendChild(li);
}

});
