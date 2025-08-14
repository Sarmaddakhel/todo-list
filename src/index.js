
// index.js (entry point)
import './style.css';
import Todo from './todo';
import Project from './project';
import { savetotdo } from './storage';
import { loadtodos } from './storage';

const myProject = new Project('Default Project');
myProject.todos=loadtodos();
// Render the main list page
function renderMainPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <header class="header">
            <h1 id="project-title">Todo App</h1>
        </header>
        <div id="todos-container">
            ${myProject.getTodos().map(todo => `
                <div class="todo-item">
                    <h3>title:${todo.title}</h3>
                    <p>description: ${todo.description}</p>
                    <p>dueDate: ${todo.dueDate}</p>
                    <p>priority: ${todo.priority}</p>
                </div>
                    </div>
                    <button class="btn btn-danger remove-todo" id="remove-btn">Remove</button>
                </div>
            `).join('')}
        </div>
        <button id="go-add-todo" class="btn full-width">Add Todo</button>
    `;
        document.getElementById('go-add-todo').addEventListener('click', renderAddTodoPage);
        const rmbtn=document.querySelectorAll(".remove-todo");
        rmbtn.forEach((btn,i)=>{
        btn.addEventListener("click",()=>{
            const todo=myProject.getTodos()[i];
            myProject.removeTodo(todo);
            savetotdo(myProject.todos);
            renderMainPage();
        })
    })


}

// Render the add-todo page
function renderAddTodoPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <header class="header">
            <h1>Add New Todo</h1>
        </header>
        <div class="todo-form">
            <div class="form-group">
                <label >Title</label>
                <input type="text" id="todo-title" class="input" placeholder="Enter title" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="todo-desc" class="input" placeholder="Enter description"></textarea>
            </div>
            <div class="form-group">
                <label>Due Date</label>
                <input type="date" id="todo-date" class="input">
            </div>
            <div class="form-group">
                <label>Priority</label>
                <select id="todo-priority" class="input">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>
            <button id="save-todo" class="btn full-width">Save Todo</button>
            <button id="cancel" class="btn full-width" style="background: var(--gray)">Cancel</button>
        </div>
    `;

    document.getElementById('save-todo').addEventListener('click', () => {
        const title = document.getElementById('todo-title').value.trim();
        const desc = document.getElementById('todo-desc').value.trim();
        const date = document.getElementById('todo-date').value;
        const priority = document.getElementById('todo-priority').value;

        if (!title) {
            alert('Title is required');
            return;
        }
        const newTodo = new Todo(title, desc, date, priority);  
        myProject.addTodo(newTodo);
        savetotdo(myProject.getTodos());
        renderMainPage();
    });

    document.getElementById('cancel').addEventListener('click', renderMainPage);
}

// Initial load
document.addEventListener('DOMContentLoaded', renderMainPage);
