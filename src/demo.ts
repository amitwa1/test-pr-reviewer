import { divide } from './calculator';

console.log('Calculator Demo - Demonstrating the Bug');
console.log('=====================================');

// Normal division works fine
console.log('10 / 2 =', divide(10, 2));

// This is where the bug shows up!
console.log('10 / 0 =', divide(10, 0));
console.log('This should throw an error, but it returns 0 instead!');

// More examples of the bug
console.log('5 / 0 =', divide(5, 0));
console.log('-10 / 0 =', divide(-10, 0));

console.log('\nThe divide function has a bug:');
console.log('- It should throw an error when dividing by zero');
console.log('- Instead, it silently returns 0');
console.log('- This could cause silent failures in production code');
