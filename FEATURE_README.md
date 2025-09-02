# Advanced Math Operations Feature

This feature adds advanced mathematical operations to the calculator library, including:

## New Functions

### Basic Operations
- `factorial(n)` - Calculates the factorial of a number
- `fibonacci(n)` - Calculates the nth Fibonacci number
- `gcd(a, b)` - Calculates the greatest common divisor
- `lcm(a, b)` - Calculates the least common multiple

### Number Theory
- `isPrime(n)` - Checks if a number is prime
- `sumPrimes(n)` - Calculates the sum of all primes up to n

### Advanced Math
- `sqrt(x, precision)` - Calculates square root using Newton's method
- `exp(x)` - Calculates exponential function

## Usage

```typescript
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

// Examples
console.log(factorial(5)); // 120
console.log(fibonacci(6)); // 8
console.log(gcd(48, 18)); // 6
console.log(isPrime(17)); // true
```

## Testing

Run the tests to see the functionality:

```bash
npm test
```

Run the demo to see examples:

```bash
npm run advanced-demo
```

## Performance Notes

Some functions may have performance issues with large inputs due to implementation details.

## Edge Cases

The functions handle various edge cases including:
- Negative numbers
- Zero values
- Large numbers
- Invalid inputs

## Future Improvements

- Add more mathematical functions
- Optimize performance for large inputs
- Add better error handling
- Implement caching for expensive operations
