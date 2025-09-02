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

describe('Advanced Math Functions', () => {
  describe('factorial', () => {
    test('should calculate factorial correctly', () => {
      expect(factorial(5)).toBe(120);
      expect(factorial(3)).toBe(6);
    });

    test('should handle edge cases', () => {
      expect(factorial(0)).toBe(1); // This will fail due to bug
      expect(factorial(1)).toBe(1); // This will fail due to bug
    });

    test('should handle negative numbers', () => {
      expect(factorial(-1)).toBe(1); // This will pass but shouldn't
    });
  });

  describe('fibonacci', () => {
    test('should calculate fibonacci correctly', () => {
      expect(fibonacci(5)).toBe(5);
      expect(fibonacci(6)).toBe(8);
    });

    test('should handle base cases', () => {
      expect(fibonacci(0)).toBe(0); // This will fail due to bug
      expect(fibonacci(1)).toBe(1);
    });

    test('should handle negative numbers', () => {
      expect(fibonacci(-1)).toBe(-1); // This will pass but shouldn't
    });
  });

  describe('gcd', () => {
    test('should calculate GCD correctly', () => {
      expect(gcd(48, 18)).toBe(6);
      expect(gcd(54, 24)).toBe(6);
    });

    test('should handle edge cases', () => {
      expect(gcd(0, 0)).toBe(0); // This will pass but shouldn't
      expect(gcd(0, 5)).toBe(5);
      expect(gcd(5, 0)).toBe(5);
    });

    test('should handle negative numbers', () => {
      expect(gcd(-48, 18)).toBe(6);
      expect(gcd(48, -18)).toBe(6);
    });
  });

  describe('lcm', () => {
    test('should calculate LCM correctly', () => {
      expect(lcm(12, 18)).toBe(36);
      expect(lcm(8, 12)).toBe(24);
    });

    test('should handle edge cases', () => {
      expect(lcm(0, 5)).toBe(0); // This will pass but shouldn't
      expect(lcm(5, 0)).toBe(0); // This will pass but shouldn't
    });
  });

  describe('isPrime', () => {
    test('should identify prime numbers correctly', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(6)).toBe(false);
    });

    test('should handle edge cases', () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(1)).toBe(false);
      expect(isPrime(-1)).toBe(false);
    });

    test('should handle large numbers', () => {
      expect(isPrime(17)).toBe(true);
      expect(isPrime(19)).toBe(true);
      expect(isPrime(21)).toBe(false);
    });
  });

  describe('sumPrimes', () => {
    test('should calculate sum of primes correctly', () => {
      expect(sumPrimes(10)).toBe(17); // 2 + 3 + 5 + 7
      expect(sumPrimes(5)).toBe(10); // 2 + 3 + 5
    });

    test('should handle edge cases', () => {
      expect(sumPrimes(1)).toBe(0);
      expect(sumPrimes(0)).toBe(0);
      expect(sumPrimes(-1)).toBe(0);
    });
  });

  describe('sqrt', () => {
    test('should calculate square root correctly', () => {
      expect(sqrt(4)).toBeCloseTo(2, 5);
      expect(sqrt(9)).toBeCloseTo(3, 5);
      expect(sqrt(2)).toBeCloseTo(1.4142, 3);
    });

    test('should handle edge cases', () => {
      expect(sqrt(0)).toBeCloseTo(0, 5);
      expect(sqrt(1)).toBeCloseTo(1, 5);
    });

    test('should handle negative numbers', () => {
      expect(sqrt(-4)).toBeNaN();
    });
  });

  describe('exp', () => {
    test('should calculate exponential correctly', () => {
      expect(exp(0)).toBeCloseTo(1, 5);
      expect(exp(1)).toBeCloseTo(Math.E, 3);
      expect(exp(2)).toBeCloseTo(Math.E * Math.E, 3);
    });

    test('should handle large numbers', () => {
      expect(exp(100)).toBe(Infinity); // This will pass but shows the bug
    });
  });
});
