const arr = [1, 2, 3, 5, -2, 0, -7];

// FOREACH -------------------------------
Array.prototype.myForeach = function(callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

arr.myForeach((value, index) => {
  console.log(`Value at index ${index}: ${value}`);
});

// MAP -------------------------------
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

const doubled = arr.myMap(value => value * 2);
console.log(doubled);

// FILTER -------------------------------
Array.prototype.myFilter = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

const positiveNumbers = arr.myFilter(value => value > 0);
console.log(positiveNumbers);

// FIND -------------------------------
Array.prototype.myFind = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

const foundNumber = arr.myFind(value => value < 0);
console.log(foundNumber);








































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