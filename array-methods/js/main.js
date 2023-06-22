const doc = document;
const todos = [
    'Купити хліб',
    'Зробити Дз',
    'Відпочити',
];

// 1
// const todoObjArr = todos.map(function (todo, index) {
//     return {
//         id: index + 1,
//         title: todo,
//         completed: false,
//     };
// });

// console.log(todoObjArr);

// 2
const todosObjArr = getTodosData(todos);

console.log(todos);
console.log(todosObjArr);


function getTodosData(todosArr) {
    return todosArr.map((todo, index) => (
        {id:index + 1,body: todo, completed: false}
    ));

}
   
   


// function getTodosData(todosArr) {
//     const todosObjArr = []

//     for (let i = 0; i < todosArr.length; i++) {
//         const todo = todosArr[i];
//         const todoObj = {
//             id: i + 1,
//             body: todo,
//             completed: false,
//         };

//         todosObjArr.push(todoObj);
//     }

//     return todosObjArr;

// }

