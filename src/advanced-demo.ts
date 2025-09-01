import {
  factorial,
  fibonacci,
  gcd,
  lcm,
  isPrime,
  sumPrimes,
  sqrt,
  exp
} from './advanced-math';

/**
 * Demo function to showcase advanced math operations
 */
export function runAdvancedMathDemo(): void {
  console.log('=== Advanced Math Operations Demo ===\n');

  // Factorial examples
  console.log('Factorial Examples:');
  console.log(`factorial(5) = ${factorial(5)}`);
  console.log(`factorial(0) = ${factorial(0)}`); // This will show the bug
  console.log(`factorial(-1) = ${factorial(-1)}`); // This will show the bug
  console.log();

  // Fibonacci examples
  console.log('Fibonacci Examples:');
  console.log(`fibonacci(5) = ${fibonacci(5)}`);
  console.log(`fibonacci(0) = ${fibonacci(0)}`); // This will show the bug
  console.log(`fibonacci(-1) = ${fibonacci(-1)}`); // This will show the bug
  console.log();

  // GCD examples
  console.log('GCD Examples:');
  console.log(`gcd(48, 18) = ${gcd(48, 18)}`);
  console.log(`gcd(0, 0) = ${gcd(0, 0)}`); // This will show the bug
  console.log(`gcd(-48, 18) = ${gcd(-48, 18)}`);
  console.log();

  // LCM examples
  console.log('LCM Examples:');
  console.log(`lcm(12, 18) = ${lcm(12, 18)}`);
  console.log(`lcm(0, 5) = ${lcm(0, 5)}`); // This will show the bug
  console.log();

  // Prime number examples
  console.log('Prime Number Examples:');
  console.log(`isPrime(17) = ${isPrime(17)}`);
  console.log(`isPrime(21) = ${isPrime(21)}`);
  console.log(`sumPrimes(10) = ${sumPrimes(10)}`);
  console.log();

  // Square root examples
  console.log('Square Root Examples:');
  console.log(`sqrt(4) = ${sqrt(4)}`);
  console.log(`sqrt(2) = ${sqrt(2)}`);
  console.log(`sqrt(-4) = ${sqrt(-4)}`); // This will show the bug
  console.log();

  // Exponential examples
  console.log('Exponential Examples:');
  console.log(`exp(1) = ${exp(1)}`);
  console.log(`exp(2) = ${exp(2)}`);
  console.log(`exp(100) = ${exp(100)}`); // This will show the bug
  console.log();

  console.log('=== Demo Complete ===');
}

/**
 * Performance test to demonstrate inefficiency bugs
 */
export function runPerformanceTest(): void {
  console.log('=== Performance Test ===\n');

  const start = Date.now();
  const result = fibonacci(30); // This will be very slow due to inefficient implementation
  const end = Date.now();
  
  console.log(`fibonacci(30) = ${result}`);
  console.log(`Time taken: ${end - start}ms`); // This will show the performance bug
  console.log();

  const start2 = Date.now();
  const result2 = isPrime(1000003); // This will be slow due to inefficient algorithm
  const end2 = Date.now();
  
  console.log(`isPrime(1000003) = ${result2}`);
  console.log(`Time taken: ${end2 - start2}ms`); // This will show the performance bug
}

if (require.main === module) {
  runAdvancedMathDemo();
  runPerformanceTest();
}
