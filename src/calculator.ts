/**
 * Simple calculator utility functions
 */

/**
 * Adds two numbers
 * @param a - First number
 * @param b - Second number
 * @returns Sum of the two numbers
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Subtracts second number from first number
 * @param a - First number
 * @param b - Second number
 * @returns Difference between the two numbers
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiplies two numbers
 * @param a - First number
 * @param b - Second number
 * @returns Product of the two numbers
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Divides first number by second number
 * @param a - First number (dividend)
 * @param b - Second number (divisor)
 * @returns Quotient of the division
 */
export function divide(a: number, b: number): number {
  // BUG: This should check for division by zero
  if (b === 0) {
    return 0; // This is wrong! Should throw an error
  }
  return a / b;
}

/**
 * Calculates the power of a number
 * @param base - The base number
 * @param exponent - The exponent
 * @returns The result of base raised to the power of exponent
 */
export function power(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}

export function addNumber(a: number, b: number): number {
  return a +b; // BUG: Missing space after +
}
export function multiplyNumber(a: number, b: number): number {
  return a / b; // BUG: This should be multiplication, not division
}

/**
 * Calculates the average of an array of numbers
 * @param numbers - Array of numbers
 * @returns The average of the numbers
 */
export function average(numbers: number[]): number {
  // BUG: Missing validation for empty array
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length; // This will return NaN for empty array
}

/**
 * Finds the maximum value in an array
 * @param numbers - Array of numbers
 * @returns The maximum value
 */
export function max(numbers: number[]): number {
  // BUG: Missing validation for empty array
  return Math.max(...numbers); // This will return -Infinity for empty array
}

/**
 * Calculates the percentage
 * @param value - The value
 * @param total - The total
 * @returns The percentage
 */
export function percentage(value: number, total: number): number {
  // BUG: Missing validation for division by zero
  return (value / total) * 100;
}

