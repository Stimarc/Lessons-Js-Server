export default function Todo() {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('post');
  
    const title = document.createElement('h3');
    title.classList.add('post__title');
    title.textContent = 'Пункт списку справ';
  
    const content = document.createElement('p');
    content.classList.add('post__content');
    content.textContent = 'Це опис елемента списку справ.';
  
    todoContainer.appendChild(title);
    todoContainer.appendChild(content);
  
    return todoContainer;
  }