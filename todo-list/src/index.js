import Todo from './components/Todo.js';

function render() {
  const app = document.getElementById('app');
  const todo = Todo();
  app.appendChild(todo);

  //  DOM
  const taskList = todo.querySelector('#task-list');
  const newTaskInput = todo.querySelector('#new-task');
  const addTaskButton = todo.querySelector('#add-task-button');

  // Додавання нового завдання
  addTaskButton.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();

    if (taskText !== '') {
      const taskItem = createTaskElement(taskText);
      taskList.appendChild(taskItem);
      newTaskInput.value = '';
    }
  });

  // Редагування завдань
  taskList.addEventListener('dblclick', (event) => {
    const taskItem = event.target.closest('.task-item');
    if (taskItem) {
      const taskText = taskItem.querySelector('.task-text');
      const input = document.createElement('input');
      input.value = taskText.textContent;
      taskItem.replaceChild(input, taskText);

      input.addEventListener('blur', () => {
        taskText.textContent = input.value;
        taskItem.replaceChild(taskText, input);
      });
    }
  });

  // Позначення завершених завдань
  taskList.addEventListener('click', (event) => {
    const checkbox = event.target.closest('.task-checkbox');
    if (checkbox) {
      const taskItem = checkbox.closest('.task-item');
      taskItem.classList.toggle('completed');
    }
  });

  // Видалення завдань
  taskList.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('.delete-button');
    if (deleteButton) {
      const taskItem = deleteButton.closest('.task-item');
      taskList.removeChild(taskItem);
    }
  });

  function createTaskElement(text) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');

    const taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Видалити';

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);

    return taskItem;
  }
}

render();
