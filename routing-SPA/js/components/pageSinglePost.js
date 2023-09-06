export function pageSinglePost(id) {
  const postData = { id: id, title: 'Заголовок поста', body: 'Текст поста' };

  return (
    `<div class="single-post">
      <h2>${postData.title}</h2>
      <p>${postData.body}</p>
    </div>`
  );
}
