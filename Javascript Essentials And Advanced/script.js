// Function to get cookies by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Function to load todos from cookies and display them
function loadTodos() {
    const todos = getCookie('todos');
    if (todos) {
        const todoList = JSON.parse(todos);
        todoList.forEach(todo => {
            addTodoToDOM(todo);
        });
    }
}

// Function to add a new todo to the DOM
function addTodoToDOM(todo) {
    const todoList = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.textContent = todo;
    todoList.appendChild(li);
}

// Event listener for the "Add Todo" button
document.getElementById('add-todo').addEventListener('click', function () {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    // Check if the input is not empty
    if (todoText) {
        // Add the new todo to the DOM
        addTodoToDOM(todoText);

        // Get existing todos from cookies or initialize an empty array
        const existingTodos = getCookie('todos') ? JSON.parse(getCookie('todos')) : [];

        // Add the new todo to the array
        existingTodos.push(todoText);

        // Store the updated todos in cookies
        setCookie('todos', JSON.stringify(existingTodos), 7); // Store for 7 days

        // Clear the input field
        todoInput.value = '';
    } else {
        alert('Please enter a todo item.');
    }
});

// Load existing todos when the page loads
loadTodos();