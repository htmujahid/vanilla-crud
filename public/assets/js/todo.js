const todoList = document.getElementById('todo-list');
const nameInput = document.querySelector('input[name="name"]');

const fetchTodos = async () => {
  nameInput.value = '';
  const response = await fetch('/api/todo', {
    cache: 'reload',
  });
  const todos = await response.json();

  if (todos.length === 0) {
    todoList.innerHTML = 'No todos';
    return;
  }

  todoList.innerHTML = todos
    .map(
      (todo) => `<div>  
      <button onclick="deleteTodo(${todo.id})">x</button>
    ${todo.name}
  </div>`,
    )
    .join('');
};

const deleteTodo = async (id) => {
  await fetch(`/api/todo/${id}`, {
    method: 'DELETE',
  });
  fetchTodos();
};
