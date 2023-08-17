//  setTimeout; setInterval;
//  clearTimeout; clearInterval 

//  const stId = setTimeout(()=>{
//   console.log('last 5 sec...');
// },5000);

// let i = 0
// const siId = setInterval(()=>{
//  if (i >= 10) {
//     clearInterval(siId);
//  }
//  console.log(i);
//  i++;
// },1000);

// console.log('hi');

//  console.log('clear timeout handler');
//  clearTimeout(stId);


// const promise = new Promise((resolve, reject) => {
//     throw new Error('... new some Error !!!');
//     setTimeout(() => {

//         if (true) {
//             resolve(10);
//         } else {
//             reject();
//         }
//     }, 5000);

// });

// promise
//     .then(data => {
//         console.log('get data completed');
//         return data;
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(() => console.log('error'));


// const fetchData = () => Promise.resolve({
// name: 'Ivan',
// age: 20
// });

// fetchData()
// .then(data => console.log(data));

// async await

//https://jsonplaceholder.typicode.com/posts/1/comments

 const postUrl = 'https://jsonplaceholder.typicode.com/posts/?_limit=5';
 const commentsUrl = 'https://jsonplaceholder.typicode.com/posts/1/comments';
// fetch(postUrl)
// .then(res => res.json())
// .then(data => {
//    data.forEach(post => {
//     const postId = post.id;

//     fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(`get comments for postId: ${postId}`);
//         console.log(data);
//     });


//    });
// });


// async function getPosts() {}

const getPosts = async () => {
  const res = await fetch(postUrl);
  const posts = await res.json();
  
  return posts;
}

const getComments = async () => {
    const posts = await getPosts();
    const postData = {};

    posts.forEach(async post => {
      const postId = post.id;

      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      const comments = await res.json();
      postData[postId] = comments;
    });

    return postData;
}

getComments()
  .then(postData => console.log(postData));
