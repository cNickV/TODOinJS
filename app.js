const alert = document.querySelector(".alert");
const formulario = document.querySelector("#formulario");
const createTodo = document.querySelector("#createTodo");
const templateTodo = document.querySelector("#templateTodo").content;

let todos = [];

const addTodo = (todo) => {
  const objTodo = {
    name: todo,
    id: `${Date.now()}`,
  };

  todos.push(objTodo);
};

const createTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));

  createTodo.textContent = " ";

  const fragment = document.createDocumentFragment();

  todos.forEach((item) => {
    const clone = templateTodo.cloneNode(true);
    clone.querySelector(".lead").textContent = item.name;

    clone.querySelector(".btn").dataset.id = item.id;

    fragment.appendChild(clone);
  });

  createTodo.appendChild(fragment);
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-danger")) {
    todos = todos.filter((item) => item.id !== e.target.dataset.id);
    createTodos();
  }
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  alert.classList.add("d-none");

  const data = new FormData(formulario);
  const [todo] = [...data.values()];

  if (!todo.trim()) {
    alert.classList.remove("d-none");
    return;
  }

  addTodo(todo);
  createTodos();
});

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    createTodos();
  }
});
