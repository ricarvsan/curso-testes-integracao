import calculator from "../src/calculator"

describe("calculator", () => {
    it('sum', () => {
        const result = calculator.sum(4, 3)
        expect(result).toBe(7)
    });
    
    it('sub', () => {
        const result = calculator.sub(4, 3)
        expect(result).toBe(1)
    });

    it('mul', () => {
        const result = calculator.mul(4, 3)
        expect(result).toBe(12)
    });

    it('div', () => {
        const result = calculator.div(4, 4)
        expect(result).toBe(1)
    });
})