const doc = document;

const
    forms = doc.forms.addTodoForm,
    formsEls = forms.elements,
    addTodoInput = forms.addTodoInput,
    addTodoBtn = forms.addTodoBtn;

    const todoListE1 = doc.querySelectorAll('todo-list');

const todos = [
    { id: 1, body: 'todo 1', completed: false },
    { id: 1, body: 'todo 1', completed: false },
    { id: 1, body: 'todo 1', completed: false },
];

renderTodoList(todos);

// ->
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
        console.log(todos);

        addTodoInput.value = '';
    }
})


function renderTodoList(todoList) {
    const todoItemEls = todoList.map((todo, index) => `
       <li class="todo-item">
          <label class="todo_item_input">
             <input type="checkbox" name="completed">
          </label>
          <p class="todo_item_text">${todo}</p>
          <div class="todo-item-btns">
             <button class="action-btn action-btn-del">x</button>
          </div>
       </li>
    `);
 
    todoListE1.innerHTML = todoItemEls.join('');
 }
 