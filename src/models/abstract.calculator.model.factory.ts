import { StandardCalculatorModel } from "./standard.calculator.model";

// Abstract factory class
abstract class AbstractCalculatorModelFactory {
    // Abstract method for creating any calculator model
    abstract createCalculatorModel(): StandardCalculatorModel;

    // Common methods for both calculators can be defined here
    commonMethod(): void {
        console.log("This method is common to all calculators.");
    }
}

class StandardCalculatorModelFactory extends AbstractCalculatorModelFactory {
    private static instance: StandardCalculatorModelFactory;

    private constructor() {
        super();
    }

    public static getInstance(): StandardCalculatorModelFactory {
        if (!StandardCalculatorModelFactory.instance) {
            StandardCalculatorModelFactory.instance = new StandardCalculatorModelFactory();
        }
        return StandardCalculatorModelFactory.instance;
    }

    createCalculatorModel(): StandardCalculatorModel {
        return new StandardCalculatorModel();
    }
}

export class RoundingCalculator extends StandardCalculatorModel {
    constructor(private nrDecimals: number) {
        super();
    }

    // Rounding method
    round(value: number): number {
        return parseFloat(value.toFixed(this.nrDecimals));
    }

    // Overriding the calculate method
    calculate(): number {
        let result = 3.14159; // Example value
        return this.round(result);
    }
}

export class RoundingCalculatorModelFactory extends AbstractCalculatorModelFactory {
    constructor(private nrDecimals: number) {
        super();
    }

    // Create a RoundingCalculator instance
    createCalculatorModel(): RoundingCalculator {
        return new RoundingCalculator(this.nrDecimals);
    }
}