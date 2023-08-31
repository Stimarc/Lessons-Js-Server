const params = getSearchParams();

const todos = [
  {id: 2, body: 'todo2', completed: true},
  {id: 1, body: 'todo1', completed: true},
  {id: 4, body: 'todo4', completed: true},
  {id: 5, body: 'todo5', completed: false},
  {id: 6, body: 'todo6', completed: true},
  {id: 3, body: 'todo3', completed: false},
];

const sortTodos = [...todos].sort((b, a) => {
  return b.id - a.id;
});

let todosEls;



if (params.sort || params.filter) {
  let filteredAndSortedTodos = [...todos];

  if (params.sort === 'desc') {
    filteredAndSortedTodos.sort((a, b) => b.id - a.id);
  }

  if (params.filter === 'completed') {
    filteredAndSortedTodos = filteredAndSortedTodos.filter(todo => todo.completed);
  } else if (params.filter === 'nocompleted') {
    filteredAndSortedTodos = filteredAndSortedTodos.filter(todo => !todo.completed);
  }

  todosEls = getTodosEls(filteredAndSortedTodos);
} else {
  todosEls = getTodosEls(todos);
}

todosParent.innerHTML = todosEls;

const completedCheckbox = document.getElementById('completedCheckbox');
const notCompletedCheckbox = document.getElementById('notCompletedCheckbox');

completedCheckbox.addEventListener('change', updateTodos);
notCompletedCheckbox.addEventListener('change', updateTodos);

function updateTodos() {
  const showCompleted = completedCheckbox.checked;
  const showNotCompleted = notCompletedCheckbox.checked;

  let updatedTodos = [...todos];

  if (!showCompleted) {
    updatedTodos = updatedTodos.filter(todo => !todo.completed);
  }

  if (!showNotCompleted) {
    updatedTodos = updatedTodos.filter(todo => todo.completed);
  }

  todosEls = getTodosEls(updatedTodos);
  todosParent.innerHTML = todosEls;
}

function getSearchParams() {
  const p = location.search
    .substring(1)
    .split('&')
    .map(item => item.split('='));

  const params = Object.fromEntries(p);

  return params;
}

function getTodosEls(data) {
  return data
    .map(todo => (
      `<li class="todo">
        <span>${todo.id}</span>
        <span>${todo.body}</span>
        <span>${todo.completed}</span>
      </li>`))
    .join('');
}
