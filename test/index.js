const isSquare = function(n) {
    if (n < 0) {
        return false; 
    }

    const sqrt = Math.sqrt(n);

    //
    return Number.isInteger(sqrt);
}

console.log(isSquare(-1)); 
console.log(isSquare(0));  
console.log(isSquare(3));  
console.log(isSquare(4));  
console.log(isSquare(25)); 
console.log(isSquare(26)); 