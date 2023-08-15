const arr = [1,2,3,5,-2,0,-7];


Array.prototype.myForeach = myForeach;

arr.myForeach();



// FOREACH -------------------------------
function myForeach() {
    console.log('My forEach array mathod')
    console.log(this);
}
// MAP -------------------------------
function myMap() {
    console.log('My map array mathod')
    
}
// FILTER -------------------------------
function myFilter() {
    console.log('My filter array mathod')
    
}
// FIND -------------------------------
function myFind() {
    console.log('My find array mathod')
    
}












































// // Чиста Функція:
// // console.log(
// //     f1(5, 10)
// // );

// // console.log(
// //     f1(5, 10)
// // );

// // console.log(
// //     f1(5, 10)
// // );

// // function f1(arg1, arg2) {
// //    const h1 = document.querySelector('h1');
// //    const res = arg1 + arg2;

// //    h1.innerHTML = res;

// //    return res;
// // }

// const names = ['Andriy', 'Mikola','Tetyana'];


// transformAndShow(names,function(item){
//     return (
//     `<div class= "box-item bg-red">
//     <span>
//        ${ item }
//        </span>
//        </div>`    
//     );
// });

// function transformAndShow(data,callback) {
//     const htmlEl = document.querySelector('.box');
//     const transformedData = transformData(data);
    
//     for (let i = 0; i < transformedData.length; i++) {
//         const item = transformedData[i];
//         htmlEl.innerHTML += callback(item);
//     }
// }

// function getDivElement(data) {
//     return(
//     `<div class = "box-item" data-index="">
//       ${ data }
//     </div>`
//     );
// }

// function getPElement(data) {
//     return(
//     `<div class = "box-item" data-index="">
//       ${ data }
//     </div>`
//     );
// }



// function transformData(arr) {
//     const transformedData = [];

//     for (let i = 0; i < arr.length; i++) {
//         const item = arr[i].toUpperCase();
//         transformedData.push(item)
//     }

//     return transformedData;
// }

// // const data = ['5','6'];
// // const dataStr = '5,6,';

// // console.log(summ(data,f1)); // 11
// // console.log(summ(dataStr,f2)); // 11
 
// // function summ(data, func) {
// //     const [a,b] = func(data);

// //     return a + b;
// // }

// // function f1 (dataArr) {
// //     return dataArr.map(item => Number(item));
// // }

// // function f2 (str) {
// //     return str.split(','),map(item => Number(item));
// // }