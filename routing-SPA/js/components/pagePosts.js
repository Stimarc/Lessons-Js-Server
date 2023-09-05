const posts = [
  {id: 1, body: 'post1'},
  {id: 2, body: 'post2'},
  {id: 3, body: 'post3'},
];

export function pagePosts() {
  return (
    `<div class="posts">
      <h2>Posts</h2>
      <div class="post">post1</div>
      <div class="post">post2</div>
      <div class="post">post3</div>
    </div>`
  );
}