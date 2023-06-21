const doc = document;

const forms = doc.forms.addTodoForm,
  formsEls = forms.elements,
  addTodoInput = forms.addTodoInput,
  addTodoBtn = forms.addTodoBtn;

const todoListE1 = doc.querySelector('.todo-list');

const todos = [
  { id: 1, body: 'todo 1', completed: false },
  { id: 2, body: 'todo 2', completed: false },
  { id: 3, body: 'todo 3', completed: false },
];

renderTodoList(todos);

addTodoBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const newTodoBody = addTodoInput.value;

  if (newTodoBody.trim() !== '') {
    const newTodo = {
      id: todos.length + 1,
      body: newTodoBody,
      completed: false
    };

    todos.push(newTodo);
    renderTodoList(todos);

    addTodoInput.value = '';
  }
});


function deleteTodoItem(id) {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    renderTodoList(todos);
  }
}

todoListE1.addEventListener('click', function (event) {
  if (event.target.classList.contains('action-btn-del')) {
    const listItem = event.target.closest('.todo-item');
    const todoId = parseInt(listItem.dataset.id);
    deleteTodoItem(todoId);
  }
});

function renderTodoList(todoList) {
  const todoItemEls = todoList.map((todo, index) => `
    <li class="todo-item" data-id="${todo.id}">
      <label class="todo_item_input">
        <input type="checkbox" name="completed">
      </label>
      <p class="todo_item_text">${todo.body}</p>
      <div class="todo-item-btns">
        <button class="action-btn action-btn-del">x</button>
      </div>
    </li>
  `);

  todoListE1.innerHTML = todoItemEls.join('');
}
