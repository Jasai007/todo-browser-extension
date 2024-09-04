document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://ec2-15-206-212-234.ap-south-1.compute.amazonaws.com:3000/todos';

    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Fetch and display todos
    const fetchTodos = async () => {
        const response = await fetch(API_URL);
        const todos = await response.json();
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo;
            li.appendChild(createDeleteButton(index));
            todoList.appendChild(li);
        });
    };

    // Create delete button
    const createDeleteButton = (index) => {
        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.addEventListener('click', async () => {
            await fetch(`${API_URL}/${index}`, {
                method: 'DELETE',
            });
            fetchTodos();
        });
        return button;
    };

    // Add new todo
    todoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const todo = todoInput.value.trim();
        if (todo) {
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: todo }),
            });
            todoInput.value = '';
            fetchTodos();
        }
    });

    fetchTodos();
});
