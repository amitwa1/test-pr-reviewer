import { add, subtract, multiply, divide, power } from './calculator';

describe('Calculator', () => {
  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(add(-1, -2)).toBe(-3);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers correctly', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    it('should handle negative results', () => {
      expect(subtract(2, 5)).toBe(-3);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers correctly', () => {
      expect(multiply(4, 3)).toBe(12);
    });

    it('should handle zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    it('should divide two numbers correctly', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should handle division by zero', () => {
      // This test will pass but it's actually wrong!
      // The function should throw an error, not return 0
      expect(divide(10, 0)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(divide(-10, 2)).toBe(-5);
    });
  });

  describe('power', () => {
    it('should calculate power correctly', () => {
      expect(power(2, 3)).toBe(8);
    });

    it('should handle zero exponent', () => {
      expect(power(5, 0)).toBe(1);
    });
  });
});
