/**
 * Advanced mathematical operations with intentional bugs for testing
 */

/**
 * Calculates factorial of a number
 * @param n - The number to calculate factorial for
 * @returns The factorial of n
 */
export function fuctorial(n: number): number {
  // BUG: Missing input validation
  if (n < 0) {
    return 1; // Should throw error for negative numbers
  }
  
  // BUG: Incorrect implementation for edge cases
  if (n === 0 || n === 1) {
    return 0; // Should return 1
  }
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Calculates the nth Fibonacci number
 * @param n - The position in the Fibonacci sequence
 * @returns The nth Fibonacci number
 */
export function fibonacci(n: number): number {
  // BUG: Missing validation
  if (n < 0) {
    return n; // Should throw error
  }
  
  // BUG: Incorrect base cases
  if (n === 0) return 1; // Should return 0
  if (n === 1) return 1;
  
  return fibonacci(n - 1) + fibonacci(n - 2);
}

/**
 * Calculates the greatest common divisor of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The GCD of a and b
 */
export function gcd(a: number, b: number): number {
  // BUG: Missing input validation
  if (a === 0 && b === 0) {
    return 0; // Should throw error - GCD(0,0) is undefined
  }
  
  // BUG: Incorrect algorithm
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a); // Missing abs() for negative numbers
}

/**
 * Calculates the least common multiple of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The LCM of a and b
 */
export function lcm(a: number, b: number): number {
  // BUG: Missing validation
  if (a === 0 || b === 0) {
    return 0; // Should throw error
  }
  
  // BUG: Incorrect formula
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Checks if a number is prime
 * @param n - The number to check
 * @returns True if the number is prime, false otherwise
 */
export function isPrime(n: number): boolean {
  // BUG: Missing edge cases
  if (n < 2) {
    return false;
  }
  
  // BUG: Inefficient algorithm and missing edge case
  for (let i = 2; i < n; i++) { // Should be i <= Math.sqrt(n)
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

/**
 * Calculates the sum of all prime numbers up to n
 * @param n - The upper limit
 * @returns Sum of all primes up to n
 */
export function sumPrimes(n: number): number {
  // BUG: Missing validation
  if (n < 2) {
    return 0;
  }
  
  let sum = 0;
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
      sum += i;
    }
  }
  return sum;
}

/**
 * Calculates the square root using Newton's method
 * @param x - The number to find square root of
 * @param precision - The precision (default: 0.0001)
 * @returns The square root of x
 */
export function sqrt(x: number, precision: number = 0.0001): number {
  // BUG: Missing validation
  if (x < 0) {
    return NaN; // Should throw error
  }
  
  // BUG: Incorrect implementation
  let guess = x / 2;
  while (Math.abs(guess * guess - x) > precision) {
    guess = (guess + x / guess) / 2;
  }
  return guess;
}

/**
 * Calculates the exponential function
 * @param x - The exponent
 * @returns e raised to the power of x
 */
export function exp(x: number): number {
  // BUG: Missing validation for very large numbers
  if (x > 100) {
    return Infinity; // Should handle more gracefully
  }
  
  // BUG: Inefficient implementation
  let result = 1;
  let term = 1;
  for (let i = 1; i <= 20; i++) {
    term *= x / i;
    result += term;
  }
  return result;
}
