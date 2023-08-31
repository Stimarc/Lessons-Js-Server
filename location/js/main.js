console.log(location);

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

console.log(params);

params.sort 
  ? todosEls = getTodosEls(sortTodos)
  : todosEls = getTodosEls(todos);

todosParent.innerHTML = todosEls;

// FUNCTIONS
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